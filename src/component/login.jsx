import "../style/style.css";
import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("enter your email!")
        .required("please enter email address!"),
      password: Yup.string()
        .min(8, 'must be more than 8 character')
        .max(12,'must be less than 12 character')
        .required("please enter password!"),
    }),
  });

  return (
    <FormikProvider value={formik}>
      <div className="container-login">
        <div className="flex-login">
          <form onSubmit={formik.handleSubmit} className="form-login">
            <label className="label-login" htmlFor="email">
              email
            </label>
            <Field type="email" id="email" {...formik.getFieldProps("email")} />
            <label className="label-login" htmlFor="password">
              password
            </label>
            <Field
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            <button type="submit" id="button-login">
              <span>submit</span>
            </button>
            {formik.touched.email && formik.errors.email ? (
              <div className="emailerror-login">{formik.errors.email}</div>
            ) : null}
            {formik.touched.password && formik.errors.password ? (
              <div className="passworderror-login">
                {formik.errors.password}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </FormikProvider>
  );
};

export default Login;
