const HorizontalStepper = ({ steps, currentStep }) => {
  const stepWidth = (currentStep / (steps.length - 1)) * 100;
  return (
    <div className="relative flex items-center isolate mb-10">
      <div className="-z-10">
        <div className="absolute  h-0.5 bg-gray-100 transition-all w-full"></div>
        <div
          className="absolute  h-0.5 bg-[#c0eb75] transition-all "
          style={{ width: `${stepWidth > 100 ? 100 : stepWidth}%` }}
        ></div>
      </div>
      <div className="flex justify-between w-full">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              index < currentStep || index === currentStep ? "text-black" : "text-gray-400"
            }`}
          >
            <div
              className={`rounded-full ${
                index < currentStep && index !== currentStep
                  ? "bg-[#c0eb75]"
                  : index === currentStep
                  ? "border-[#c0eb75] border-[3px] bg-white"
                  : "border-gray-300 border-[3px] bg-white"
              } h-8 w-8 flex items-center justify-center`}
            >
              {index + 1}
            </div>

            <div
              className={`flex-1 ${
                index < currentStep && index !== currentStep
                  ? "text-black hidden sm:block"
                  : index === currentStep
                  ? "text-[#c0eb75] "
                  : "text-gray-400 hidden sm:block"
              } h-1 mx-3 absolute whitespace-nowrap translate-y-10 text-sm`}
            >
              <span>{step}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalStepper;
