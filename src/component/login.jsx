import "../style/style.css";
import {useFormik } from "formik";
import * as yup from "yup"

const Login = () => {
  const formik = useFormik({
    initialvalues: {
      email: "",
      password : ""
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values))
    },
    validationSchema: yup.object({
      email: yup.string().email().required('please enter email address'),
      password:yup.string().min(8,'your password should be more than 8 character').required('please enter password')
    })
  });
  

  return (
    <>
      <div className="container-login">
        <div className="flex-login">
          <form onSubmit={formik.handlesubmit}>
            <label htmlFor="email">email</label>
            <input type="email" id="email" {...formik.getfieldProps("email")} />
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              {...formik.getfieldprops("password")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
