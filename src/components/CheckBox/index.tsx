export default function CheckBox({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  return (
    <>
      <div className="cntr">
        <input type="checkbox" id={id} className="hidden-xs-up input-cbx" />
        <label htmlFor={id} className="cbx"></label>
      </div>
      <label htmlFor={id} className="label-cbx mx-2">
        {content}
      </label>
    </>
  );
}
