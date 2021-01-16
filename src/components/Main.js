import HeadingsRow from "./HeadingsRow";

function onOrdersChanged(orders) {
  console.log(JSON.stringify(orders));
}

function Main() {
  return (
    <div className="Main">
      <table>
      <thead>
        <HeadingsRow onChanged={onOrdersChanged} />
      </thead>
      </table>
    </div>
  );
}

export default Main;
