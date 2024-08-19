export default function CheckBox({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  return (
    <div className="flex items-center">
      <div className="cntr">
        <input type="checkbox" id={id} className="hidden-xs-up input-cbx" />
        <label htmlFor={id} className="cbx"></label>
      </div>
      <label htmlFor={id} className="label-cbx mx-2 cursor-pointer">
        {content}
      </label>
    </div>
  );
}
