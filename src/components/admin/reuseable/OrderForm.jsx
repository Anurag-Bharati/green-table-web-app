import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const foodsList = [
  "Burger",
  "Pizza",
  "Pasta",
  "Salad",
  "Sandwich",
  // Add more food items as needed
];

const OrderForm = () => {
  const initialValues = {
    food: "",
    diner: "",
    email: "",
    phone: "",
    quantity: "",
    notes: "",
  };

  const validationSchema = Yup.object({
    food: Yup.string().required("Required"),
    diner: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string().required("Required"),
    quantity: Yup.number().required("Required").min(1, "Must be at least 1"),
    notes: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle submission logic here
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="food" className="block font-medium mb-1">
                Food Name
              </label>
              <Field as="select" id="food" name="food" className="w-full border rounded px-3 py-2">
                <option value="" disabled>
                  Select a food
                </option>
                {foodsList.map((food, index) => (
                  <option key={index} value={food}>
                    {food}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="food" component="p" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="diner" className="block font-medium mb-1">
                Diner Name
              </label>
              <Field
                type="text"
                id="diner"
                name="diner"
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
            <div className="mb-4">
              <label htmlFor="quantity" className="block font-medium mb-1">
                Quantity
              </label>
              <Field
                type="number"
                id="quantity"
                name="quantity"
                className="w-full border rounded px-3 py-2"
              />
              <ErrorMessage name="quantity" component="p" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="notes" className="block font-medium mb-1">
                Notes
              </label>
              <Field
                as="textarea"
                id="notes"
                name="notes"
                rows="3"
                className="w-full border rounded px-3 py-2"
              />
              <ErrorMessage name="notes" component="p" className="text-red-500" />
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

export default OrderForm;
