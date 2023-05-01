"use client";

import HorizontalStepper from "@/components/reusable/FormStepper";
import styles from "@/styles/landing/reservation_form.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  BiCalendar,
  BiCheckCircle,
  BiChevronDown,
  BiDetail,
  BiTime,
  BiUser,
  BiX,
} from "react-icons/bi";
import DateTimePicker from "../reusable/DateTimePicker";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import scrollToElement from "@/utils/helper";

const steps = ["Find Table", "Guest Details", "Confirmation"];
const partySize = ["1", "2", "3", "4", "5-7", "8+"];

const ReservationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ partySize: "", date: null, time: "", diner: null });
  const userInfoFormRef = useRef(null);

  const handlePartySize = (e) => setFormData({ ...formData, partySize: e.target.innerText });
  const handleTime = (e) => setFormData({ ...formData, time: e.target.innerText });
  const handleDate = (dateString) => setFormData({ ...formData, date: dateString });
  const increaseStep = () => setCurrentStep((prev) => (prev >= 3 ? 3 : prev + 1));
  const decreaseStep = () => setCurrentStep((prev) => (prev < 1 ? 1 : prev - 1));
  const toggleOpen = () => setIsOpen(!isOpen);
  const handleReset = () => {
    setCurrentStep(0);
    setFormData({ partySize: "", date: null, time: "", diner: null });
  };

  const handleSubmitReservation = () => {
    // send data to backend
    increaseStep();
    let interval = setInterval(() => {
      handleReset();
      setIsOpen(false);
      clearInterval(interval);
    }, 2000);
  };
  useEffect(() => {
    // scroll to reservation form
    if (currentStep === 0) return;
    scrollToElement("reservation-form");
  }, [currentStep]);
  const handleUserInfoFormSubmit = () => {
    if (userInfoFormRef.current === null) return;
    if (userInfoFormRef?.current?.reportValidity()) {
      // get value from userInfoFormRef
      const fd = new FormData(userInfoFormRef.current);
      const diner = Object.fromEntries(fd.entries());
      setFormData({ ...formData, diner });
      increaseStep();
    }
  };

  return (
    <>
      <div
        className={`relative px-6 pt-6 rounded-3xl max-w-3xl mx-auto ${styles.wrapper} `}
        data-ring
      >
        <div className="flex flex-col sm:flex-row justify-between gap-4 pb-8" onClick={toggleOpen}>
          <button className="flex flex-1 gap-x-2 justify-between py-4 pr-3 pl-4 bg-[#c0eb75] rounded-xl items-center">
            <span className="p-2 rounded-full">
              <BiUser className="h-6 w-6" />
            </span>
            <p className="text-lg flex-1">
              {formData.partySize !== ""
                ? formData.partySize > 1
                  ? `${formData.partySize} Guests`
                  : `${formData.partySize} Guest`
                : "Party Size"}
            </p>
            <BiChevronDown className="h-6 w-6" />
          </button>
          <button className="flex flex-1 gap-x-2 justify-between py-2 pr-2 pl-3 bg-[#c0eb75] rounded-xl items-center">
            <span className="p-2 rounded-full">
              <BiCalendar className="h-6 w-6" />
            </span>
            <p className="text-lg flex-1">
              {formData.date
                ? formData.date?.toDateString().split(" ").slice(0, 3).join(" ")
                : "Date"}
            </p>
            <BiChevronDown className="h-6 w-6" />
          </button>
          <button className="flex flex-1 gap-x-2 justify-between py-2 pr-2 pl-3 bg-[#c0eb75] rounded-xl items-center">
            <span className="p-2 rounded-full">
              <BiTime className="h-6 w-6" />
            </span>
            <p className="text-lg flex-1">{formData.time !== "" ? formData.time : "Time"}</p>
            <BiChevronDown className="h-6 w-6" />
          </button>
        </div>
        <div
          id="reservation-form"
          className={`absolute left-0 right-0 transition-all duration-300 ease-in-out ${
            isOpen ? "-bottom-32 opacity-0 scale-[200%]" : "-bottom-8 opacity-100 scale-100"
          } flex justify-center items-center`}
          data-ring
        >
          <button
            className={`${
              isOpen ? "bg-white text-black" : "bg-black text-white  "
            } py-2 pr-2 pl-3  rounded-xl text-xl hover:-translate-y-1 transition-all  duration-150 ease-in-out`}
            onClick={toggleOpen}
          >
            Find My Table
          </button>
        </div>
      </div>
      {/* RESERVATION FORM  */}
      <div
        className={`relative transition-all duration-300 ease-in-out ${
          isOpen
            ? "mt-16 p-6 md:p-12 h-fit scale-100 opacity-100 bg-white"
            : "mt-0 p-0 md:p-0 h-0 scale-[5%] touch-none pointer-events-none opacity-0 bg-black"
        } overflow-hidden md:px-6 rounded-3xl max-w-3xl mx-auto ${styles.wrapper} `}
      >
        <div
          className="top-3 right-3 absolute rounded-full bg-red-400 text-white text-3xl cursor-pointer"
          onClick={toggleOpen}
        >
          <BiX />
        </div>
        <div className="flex flex-col justify-between items-center gap-4">
          <div className="w-full max-w-md ">
            <HorizontalStepper steps={steps} currentStep={currentStep} />
          </div>
          {currentStep === 2 && <ConfirmReservation formData={formData} />}
          {currentStep === 1 && <UserInfoForm userInfoFormRef={userInfoFormRef} form={formData} />}
          {currentStep === 0 && (
            <>
              <PartySizeComponent handlePartySize={handlePartySize} formData={formData} />
              <DateTimePicker
                allowedDays={30}
                handleTime={handleTime}
                formData={formData}
                handleDate={handleDate}
              />
            </>
          )}
          {currentStep === 3 && (
            <div className="w-full rounded-3xl flex gap-4 bg-[#11111111] p-4">
              <div className="flex flex-col gap-4 w-full">
                <div className="bg-[#c0eb75] rounded-xl p-2 mx-auto">
                  <BiCheckCircle className="h-8 w-8" />
                </div>
                <p className=" text-xl font-medium text-center animate-bounce">
                  Your Reservation has been made!
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            className="bg-black text-white  py-2 pr-2 pl-3  rounded-xl text-xl  disabled:opacity-50"
            onClick={decreaseStep}
            disabled={currentStep === 0 || currentStep === 3}
          >
            Go Back
          </button>
          {currentStep === 0 ? (
            <button
              className="bg-black text-white  py-2 pr-2 pl-3  rounded-xl text-xl hover:-translate-y-1 transition-all  duration-150 ease-in-out"
              onClick={increaseStep}
            >
              Find My Table
            </button>
          ) : currentStep === 1 ? (
            <button
              className="bg-black text-white  py-2 pr-2 pl-3  rounded-xl text-xl hover:-translate-y-1 transition-all  duration-150 ease-in-out"
              onClick={handleUserInfoFormSubmit}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-black text-white  py-2 pr-2 pl-3  rounded-xl text-xl hover:-translate-y-1 transition-all  duration-150 ease-in-out disabled:opacity-50"
              onClick={handleSubmitReservation}
              disabled={currentStep === 3}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationForm;

const PartySizeComponent = ({ handlePartySize, formData }) => {
  return (
    <div className="w-full p-6 bg-[#11111108] rounded-xl">
      <div className="flex flex-col gap-6">
        <p className="text-xl font-medium text-center">Whats your party size?</p>
        <div className="flex gap-2 text-center justify-evenly">
          {partySize.map((size, index) => (
            <button
              key={index}
              onClick={handlePartySize}
              className={`py-2 px-4 rounded-lg  w-20 ${
                formData.partySize === size ? "bg-[#c0eb75]" : "bg-gray-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ConfirmReservation = ({ formData }) => {
  return (
    <div className="w-full rounded-3xl flex gap-4 bg-[#11111111] p-4">
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-[#c0eb75] rounded-xl p-2 mx-auto">
          <BiDetail className="h-8 w-8" />
        </div>
        <p className="text-xl font-medium text-center">{formData?.diner?.name}</p>
        <div className="w-full rounded-3xl flex gap-4 bg-[#11111111] ">
          <div className="flex gap-2  justify-between w-full ">
            <div className="border-r-2 border-white flex-1 p-6">
              <p className="text-lg font-medium text-center">Party Size</p>
              <p className="text-lg font-medium text-center">
                {formData.partySize !== ""
                  ? formData.partySize > 1
                    ? `${formData.partySize} Guests`
                    : `${formData.partySize} Guest`
                  : "N/A"}
              </p>
            </div>
            <div className="border-r-2 border-white flex-1 p-6">
              <p className="text-lg font-medium text-center">Date</p>
              <p className="text-lg font-medium text-center">
                {formData.date
                  ? formData.date?.toDateString().split(" ").slice(0, 3).join(" ")
                  : "N/A"}
              </p>
            </div>
            <div className="te flex-1 p-6">
              <p className="text-lg font-medium text-center">Time</p>
              <p className="text-lg font-medium text-center">
                {formData.time !== "" ? formData.time : "Time"}
              </p>
            </div>
          </div>
        </div>
        <p className="text-xl font-medium text-center">Your Contact Details</p>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium text-center">{formData?.diner?.email}</p>
          <p className="text-lg font-medium text-center">{formData?.diner?.phone}</p>
          <p className="text-lg font-medium text-center">{formData?.diner?.notes}</p>
        </div>
      </div>
    </div>
  );
};

const UserInfoForm = ({ userInfoFormRef, form }) => {
  const { data: session, status } = useSession();
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const applyDetails = () => {
    nameRef.current.value = session?.user?.name;
    emailRef.current.value = session?.user?.email;
  };
  return (
    <div className="w-full p-6 bg-[#11111108] rounded-xl">
      <div className="flex flex-col gap-6">
        <p className="text-xl font-medium text-center">Your Information</p>
        {status === "authenticated" && (
          <div className="w-full rounded-3xl flex gap-4 bg-[#11111111] p-4">
            <Image
              height={64}
              width={64}
              src={session?.user?.image}
              alt="user image"
              className="rounded-full h-16 w-16"
            />
            <div className="flex flex-col ">
              <p className="text-md">{session?.user?.name}</p>
              <p className="text-md ">{session?.user?.email}</p>
              <a className="text-sm text-red-500 cursor-pointer" onClick={signOut}>
                Not you? Sign out
              </a>
            </div>
            <div className="ml-auto mr-6 my-auto">
              <button
                className="bg-black text-white  py-2 pr-2 pl-3  rounded-xl "
                onClick={applyDetails}
              >
                Apply Details from this Account
              </button>
            </div>
          </div>
        )}
        <form ref={userInfoFormRef}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={() => null}
              value={form?.diner?.name}
              className="px-3 py-4 rounded-lg"
              ref={nameRef}
              placeholder="Your name"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={() => null}
              value={form?.diner?.email}
              className="px-3 py-4 rounded-lg"
              ref={emailRef}
              placeholder="Your email address"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-lg">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              onChange={() => null}
              value={form?.diner?.phone}
              className="px-3 py-4 rounded-lg"
              placeholder="Your phone number"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="notes" className="text-lg">
              Notes
            </label>
            <textarea
              name="notes"
              id="notes"
              onChange={() => null}
              value={form?.diner?.notes}
              className="px-3 py-4 rounded-lg"
              placeholder="Any special requests?"
              maxLength={200}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
