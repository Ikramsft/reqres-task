/**
 * @format
 */
import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";

export interface ISignUp {
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: ISignUp = {
  email: "",
  password: "",
  confirmPassword: ""
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter email address"),
  password: Yup.string().required("Please enter password"),
  confirmPassword: Yup.string()
    .required("Please enter password")
    .oneOf([Yup.ref("password"), null], "Passwords must be match")
});

export const useSignupForm = (
  onSubmit: (
    values: ISignUp,
    formikHelpers: FormikHelpers<ISignUp>
  ) => void | Promise<unknown>,
  initialValues: ISignUp = defaultValues
) => {
  return useFormik<ISignUp>({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit
  });
};
