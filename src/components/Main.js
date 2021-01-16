import HeadingsRow from "./HeadingsRow";
import FilterRow from "./FilterRow";
// import ItemRow from "./ItemRow";
import UpdateItemRow from "./UpdateItemRow";
import CreateItemRow from "./CreateItemRow";

const VEHICLE = {
  id: 100,
  name: "Name",
  type: "ONE",
  coordinates: { x: 12, y: 23 },
  enginePower: 12.345,
  fuelType: "TWO",
  fuelConsumption: 999
}

function print(what, o) {
  var text = what;
  if (o) {
    text += ": " + JSON.stringify(o);
  }
  console.log(text);
}

function Main() {
  return (
    <div className="Main">
      <table>
      <thead>
        <FilterRow onChanged={print.bind(null, "filters")} />
        <HeadingsRow onChanged={print.bind(null, "orders")} />
        <CreateItemRow onCreate={print.bind(null, "created")} />
      </thead>
      <tbody>
        <UpdateItemRow
          onUpdate={print.bind(null, "updated")}
          onCancelClick={print.bind(null, "cancel clicked")}
          vehicle={VEHICLE}
        />
      </tbody>
      </table>
    </div>
  );
}

export default Main;
