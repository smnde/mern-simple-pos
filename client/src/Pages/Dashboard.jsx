import style from "../component/css/Dashboard.module.css";
import Card from "../component/Card";

function Dashboard() {
  return (
    <>
      <div className={style.container}>
        <div className={style.cardContainer}>
          <Card />
        </div>
        <div className={style.chartContainer}>B</div>
      </div>
    </>
  );
}
export default Dashboard;
