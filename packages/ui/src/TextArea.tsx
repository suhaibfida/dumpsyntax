interface Text {
  className: string;
}
export const TextArea = ({ className }: Text) => {
  return (
    <>
      <textarea
        className={className}
        placeholder="Enter the text here......"
      ></textarea>
    </>
  );
};
