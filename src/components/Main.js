import HeadingsRow from "./HeadingsRow";
import FilterRow from "./FilterRow";

function print(o) {
  console.log(JSON.stringify(o));
}

function Main() {
  return (
    <div className="Main">
      <table>
      <thead>
        <FilterRow onChanged={print} />
        <HeadingsRow onChanged={print} />
      </thead>
      </table>
    </div>
  );
}

export default Main;
