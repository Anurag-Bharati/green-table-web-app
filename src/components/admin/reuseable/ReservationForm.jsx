import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ReservationForm = () => {
  const initialValues = {
    datetime: "",
    partysize: "",
    diner: "",
    email: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    datetime: Yup.date().required("Required"),
    partysize: Yup.number().required("Required").min(1, "Must be at least 1"),
    diner: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle submission logic here
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="p-6 bg-white rounded-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="datetime" className="block font-medium mb-1">
                Datetime
              </label>
              <Field
                type="datetime-local"
                id="datetime"
                name="datetime"
                className="w-full border rounded px-3 py-2"
              />
              <ErrorMessage name="datetime" component="p" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="partysize" className="block font-medium mb-1">
                Party Size
              </label>
              <Field
                type="number"
                id="partysize"
                name="partysize"
                className="w-full border rounded px-3 py-2"
              />
              <ErrorMessage name="partysize" component="p" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="diner" className="block font-medium mb-1">
                Diner
              </label>
              <Field
                type="text"
                id="diner"
                name="name"
                className="w-full border rounded px-3 py-2"
              />
              <ErrorMessage name="diner" component="p" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full border rounded px-3 py-2"
              />
              <ErrorMessage name="email" component="p" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block font-medium mb-1">
                Phone
              </label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                className="w-full border rounded px-3 py-2"
              />
              <ErrorMessage name="phone" component="p" className="text-red-500" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReservationForm;
