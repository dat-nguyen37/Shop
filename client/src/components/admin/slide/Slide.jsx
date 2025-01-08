import React, { useEffect, useRef, useState } from 'react';
import axios from '../../../axios'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { imgDb } from '../../../firebase';
import { ToastContainer,toast } from 'react-toastify';
import {
  EuiButtonIcon,
  EuiDragDropContext,
  EuiFlexGroup,
  EuiFlexItem,
  EuiDraggable,
  EuiDroppable,
  EuiIcon,
  EuiPanel,
  euiDragDropCopy,
  euiDragDropReorder,
  htmlIdGenerator,
  EuiText,
  EuiLoadingLogo,
  EuiButtonEmpty,
  EuiFilePicker,
  EuiImage,
  euiDragDropMove,  
} from '@elastic/eui';

export default () => {

  const imgRef = useRef();
  const handleImg=()=>{
    if (imgRef.current?.fileInput) {
      imgRef.current.fileInput.click(); 
    }
  }
  const image=(files)=>{
    const file=Array.from(files)[0]
    try {
        const imgRef = ref(imgDb, `/slide/${file.name}`);
        const uploadTask = uploadBytesResumable(imgRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent=Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (err) => console.log(err),
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                try {
                  await axios.post("/slide/create",{imageUrl:url})
                  getSlides()
                  toast.success("Upload thành công")
                } catch (err) {
                  toast.success("Upload thất bại")
                  console.log(err)
                }

            }
        );
    } catch (err) {
        console.error("Error uploading image:", err);
    }
  }
  
  const [data,setData]=useState([])
  const getSlides=async()=>{
    try {
      const res=await axios.get("/slide/getAll")
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getSlides()
  },[])
  const makeId = htmlIdGenerator();

  useEffect(() => {
    const makeList = () =>
      data.map((el) => {
        return {
          imageUrl: el.imageUrl,
          id: makeId(),
          _id:el._id,
          isActive: el.isActive,
          order:el.order
        };
      });
  
    setList1(makeList().filter(m=>m.isActive===false));
    setList2(makeList().filter(m=>m.isActive===true).sort((a, b) => a.order - b.order));
  }, [data]);

  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const onDragEnd = ({ source, destination }) => {
    const lists = { DROPPABLE_AREA_1: list1, DROPPABLE_AREA_2: list2 };
    const actions = { DROPPABLE_AREA_1: setList1, DROPPABLE_AREA_2: setList2 };
    if (source && destination) {
      if (source.droppableId === destination.droppableId) {
        const items = euiDragDropReorder(
          lists[destination.droppableId],
          source.index,
          destination.index
        );

        actions[destination.droppableId](items);
      } else {
        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;
        const result = euiDragDropMove(
          lists[sourceId],
          lists[destinationId],
          source,
          destination
        );

        actions[sourceId](result[sourceId]);
        actions[destinationId](result[destinationId]);
      }
    }
  };

  useEffect(()=>{
    const update=async()=>{
      try {
        await axios.post("/slide/update",{list1,list2})
      } catch (err) {
        console.log(err)
      }
    }
    update()
  },[list1,list2])
  return (
    <EuiDragDropContext onDragEnd={onDragEnd}>
      <EuiFlexGroup >
        <EuiFlexItem >
          <EuiDroppable
            droppableId="DROPPABLE_AREA_1"
            spacing="m"
            withPanel
            style={{minHeight:"50vh"}}
          >
            <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
              <EuiText><h3>Danh sách</h3></EuiText>
              <EuiButtonIcon iconType="exportAction" onClick={handleImg} iconSize='l'/>
              <div style={{display:"none"}}>
                <EuiFilePicker onChange={image} ref={imgRef}/>
              </div>
            </EuiFlexGroup>
            {list1.length > 0 ? (
              list1.map(({ imageUrl, id }, idx) => (
                <EuiDraggable spacing="l" key={id} index={idx} draggableId={id}>
                  {(provided, state) => (
                    <EuiPanel>
                      <img src={imageUrl} style={{width:"100%",height:"150px"}}/>
                      {state.isDragging && ' ✨'}
                    </EuiPanel>
                  )}
                </EuiDraggable>
              ))
            ) : (
              <EuiFlexGroup
                alignItems="center"
                justifyContent="spaceAround"
                gutterSize="none"
                style={{ height: '100%' }}
              >
                <EuiFlexItem grow={false}>
                  <EuiIcon type="faceSad" />
                </EuiFlexItem>
              </EuiFlexGroup>
            )}
          </EuiDroppable>
        </EuiFlexItem>
        <EuiFlexItem >
          <EuiDroppable
            droppableId="DROPPABLE_AREA_2"
            spacing="m"
            withPanel
            style={{minHeight:"50vh"}}
          >
            <EuiText><h3>Hiển thị</h3></EuiText>
            {list2.length > 0 ? (
              list2.map(({ imageUrl, id }, idx) => (
                <EuiDraggable spacing="m" key={id} index={idx} draggableId={id}>
                  {(provided, state) => (
                    <EuiPanel>
                      <img src={imageUrl} style={{width:"100%",height:"150px"}}/>
                      {state.isDragging && ' ✨'}
                    </EuiPanel>
                  )}
                </EuiDraggable>
              ))
            ) : (
              <EuiFlexGroup
                alignItems="center"
                justifyContent="spaceAround"
                gutterSize="none"
                style={{ height: '100%' }}
              >
                <EuiFlexItem grow={false}>
                  <EuiIcon type="faceSad" />
                </EuiFlexItem>
              </EuiFlexGroup>
            )}
          </EuiDroppable>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiDragDropContext>
  );
};  