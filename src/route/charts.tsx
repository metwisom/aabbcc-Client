import '../App.css';
import {useGetDataMutation} from '../services/data.ts';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {addData} from "../services/dataSlice.ts";
import {useData} from "../services/useData.ts";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

function Charts() {
  const dispatch = useDispatch()
  const [getData] = useGetDataMutation();
  const aspects = useData()

  useEffect(() => {
    setInterval(async () =>{
      const data = await getData().unwrap()
      dispatch(addData(data.items))
    } ,1000)
  }, []);


  const list: Record<string, Record<string, string>> = {};
  let data: ChartData<'line'> | undefined = undefined;
  let avgData: ChartData<'line'> | undefined = undefined;
  if (aspects.length > 0) {
    aspects.map(aspect => {
      if (list[aspect.aspect] == undefined) {
        list[aspect.aspect] = {};
      }
      list[aspect.aspect][aspect.time] = aspect.value;
    });

    data = {
      labels: Object.keys(list['AvailableRam']).map(value => new Date(Date.parse(value)).toLocaleTimeString()),
      datasets: [{
        label: 'FreeRam',
        data: Object.values(list['FreeRam']).map(value => parseInt(value) / 1000),
        fill: false,
        borderColor: '#9f7411',
        tension: 0.1,
      }, {
        label: 'AvailableRam',
        data: Object.values(list['AvailableRam']).map(value => parseInt(value) / 1000),
        fill: false,
        borderColor: '#9f7411',
        tension: 0.1,
      }, {
        label: 'TotalRam',
        data: Object.values(list['TotalRam'] || []).map(value => parseInt(value) / 1000),
        fill: false,
        borderColor: '#9f7411',
        tension: 0.1,
      }],
    };
    avgData = {
      labels: Object.keys(list['Avg1M']).map(value => new Date(Date.parse(value)).toLocaleTimeString()),
      datasets: [{
        label: 'Avg1M',
        data: Object.values(list['Avg1M']).map(value => parseInt(value)),
        fill: false,
        borderColor: '#9f7411',
        tension: 0.1,
      }, {
        label: 'Avg5M',
        data: Object.values(list['Avg5M']).map(value => parseInt(value)),
        fill: false,
        borderColor: '#9f7411',
        tension: 0.1,
      }, {
        label: 'Avg15M',
        data: Object.values(list['Avg15M']).map(value => parseInt(value)),
        fill: false,
        borderColor: '#9f7411',
        tension: 0.1,
      }],
    };

  }


  return (
    <>
      {data ? <Line data={data}/> : <></>}
      {avgData ? <Line data={avgData}/> : <></>}

      {/*{JSON.stringify(posts)}*/}
    </>
  );
}

export default Charts;
