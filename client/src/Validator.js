export const validator = (values) => {
    let errors = {};
  
    // Kiểm tra email
    if (!values.email) {
      errors.email = "Email không được để trống";
    } else {
      const re = /^[^\s@]{5,}@[^\s@]+\.[^\s@]{2,}$/;
      if (!re.test(String(values.email).toLowerCase())) {
        errors.email = "Địa chỉ email không hợp lệ";
      }
    }
    // Kiểm tra tên đăng nhập
    if (!values.name) {
      errors.name = "Tên đăng nhập không được để trống";
    }
  
    // Kiểm tra mật khẩu
    if (!values.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (values.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
  
    // Kiểm tra nhập lại mật khẩu
    if (!values.reEnterPassword) {
      errors.reEnterPassword = "Vui lòng nhập lại mật khẩu";
    } else if (values.reEnterPassword !== values.password) {
      errors.reEnterPassword = "Mật khẩu nhập lại không khớp";
    }
  
    return {errors};
  };
  