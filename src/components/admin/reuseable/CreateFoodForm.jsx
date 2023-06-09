"use client";

import { firestore } from "@/config/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import * as Yup from "yup";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import InfiniteLinearProgressBar from "@/components/reusable/InfiniteLinearProgressBar";

const storage = getStorage();

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  category: Yup.number().required("Category is required"),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price must be at least 1")
    .max(1000, "Price must be at most 1000"),
  description: Yup.string().required("Description is required"),
});

const categories = [
  { label: "Appetizer", value: 2640 },
  { label: "Main Course", value: 2290 },
  { label: "Others", value: 2760 },
  { label: "Dessert", value: 2492 },
  { label: "Beverages", value: 2631 },
  { label: "Fish-Items", value: 2956 },
  { label: "Seafood", value: 2867 },
  { label: "Salad", value: 2664 },
  { label: "Soup", value: 2494 },
  { label: "Snacks", value: 2760 },
];

const initialValues = {
  name: "",
  category: "",
  price: "",
  description: "",
};

const menuRef = collection(firestore, "menu");

const CreateFoodForm = () => {
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const filePickerRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [values, setValues] = useState(null);
  const formRef = useRef(null);

  const onSubmit = (values) => {
    const cat = categories.find((c) => c.value == values.category);
    const formData = { ...values, category: cat };
    console.log(formData);
    setValues(formData);
    uploadImage(imageData);
  };

  // create food document in firestore
  useEffect(() => {
    if (!downloadURL || !values) return;
    let debounce;
    const createFood = async (food) => {
      try {
        await addDoc(menuRef, food);
      } catch (error) {
        console.log(error);
      }
    };

    debounce = setTimeout(() => {
      createFood({ ...values, image: downloadURL }).then(() => {
        clearImage();
        setUploadPercentage(0);
        setSaving(false);
        setValues(null);
        setDownloadURL(null);
        formRef?.current?.resetForm();
      });
    }, 1000);

    return () => clearTimeout(debounce);
  }, [downloadURL, values]);

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImageData(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };

  const clearImage = () => {
    setImage(null);
    setImageData(null);
  };

  // upload image to firebase storage and execute createFood function
  const uploadImage = (file) => {
    setUploadPercentage(0);
    if (!file) return;
    const ts = Date.now().toString();
    const storageRef = ref(storage, `menu/food-${ts}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (!saving) setSaving(true);
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(progress);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
        });
      }
    );
  };

  return (
    <div className="relative px-2 flex flex-col gap-1">
      <div
        className={`absolute w-full h-full bg-[#ffffff55] rounded-xl backdrop-blur-sm  z-30 transition duration-300 ${
          saving ? "opacity-100" : "opacity-0 pointer-events-none"
        } flex flex-col justify-center items-center gap-1`}
      >
        <div className="px-4">
          <div className="h-1 w-48 bg-gray-300 rounded-full overflow-hidden">
            {imageData && uploadPercentage < 99.0 ? (
              <div
                className="h-full bg-[#a3e635] rounded-full"
                style={{ width: `${uploadPercentage}%` }}
              ></div>
            ) : (
              <InfiniteLinearProgressBar />
            )}
          </div>
        </div>
        <p className=" text-sm">Hang tight!</p>
        <p className=" text-sm">The food is being saved</p>
      </div>
      <div className="relative h-48 w-full bg-[#11111122] overflow-hidden mb-2">
        {image ? (
          <>
            <span
              className="absolute text-white bg-red-500 text-sm rounded-md px-1 py-0 bottom-0 right-0 m-3 cursor-pointer "
              onClick={clearImage}
            >
              clear
            </span>
            <Image
              height={192}
              width={250}
              src={image}
              alt="Food Image"
              className="w-full h-full object-cover"
              fallback={<div />}
            />
          </>
        ) : (
          <div className=" h-full w-full p-7">
            <div className="relative border-2  h-full w-full rounded-xl border-dashed flex">
              <input
                type="file"
                className=" absolute h-full w-full opacity-0  cursor-pointer"
                ref={filePickerRef}
                onChange={addImage}
              />
              <BiImageAdd className="w-8 h-8 text-[#ffffff99] m-auto" />
            </div>
          </div>
        )}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formRef}
      >
        <Form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium mb-1">
              Name
            </label>
            <Field type="text" id="name" name="name" className="border rounded py-2 px-3" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm font-medium mb-1">
              Category
            </label>
            <Field as="select" id="category" name="category" className="border rounded py-2 px-3">
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Field>
            <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-medium mb-1">
              Price
            </label>
            <Field type="number" id="price" name="price" className="border rounded py-2 px-3" />
            <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium mb-1">
              Description
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              rows="4"
              className="border rounded py-2 px-3"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Create Food
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateFoodForm;
