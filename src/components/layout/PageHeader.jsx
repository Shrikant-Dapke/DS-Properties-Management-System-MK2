function PageHeader({
  title,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">
        {title}
      </h1>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="
            bg-blue-600
            hover:bg-blue-700
            transition
            px-5
            py-2.5
            rounded-xl
            font-medium
          "
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default PageHeader;