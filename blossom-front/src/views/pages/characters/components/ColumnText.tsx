const ColumnText = ({
  topText,
  bottomText,
}: {
  topText: string;
  bottomText: string;
}) => {
  return (
    <div className="flex flex-col w-full">
      <span className="text-base font-semibold">{topText}</span>
      <span className="text-base font-normal">{bottomText}</span>
    </div>
  );
};

export default ColumnText;
