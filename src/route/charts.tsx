import '../App.css';
import {useGetPostsQuery} from '../services/data.ts';
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

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

function Charts() {
  const {data: posts, refetch} = useGetPostsQuery();

  useEffect(() => {
    setInterval(() => refetch(),1000)
  }, []);


  const list: Record<string, Record<string, number>> = {};
  let data: ChartData<'line'> | undefined = undefined;
  let avgData: ChartData<'line'> | undefined = undefined;
  if (posts) {
    posts.items.map(post => {
      if (list[post.aspect] == undefined) {
        list[post.aspect] = {};
      }
      list[post.aspect][post.time] = post.value;
    });

    data = {
      labels: Object.keys(list['AvailableRam']).map(value => new Date(Date.parse(value)).toLocaleTimeString()),
      datasets: [{
        label: 'FreeRam',
        data: Object.values(list['FreeRam']).map(value => value / 1000),
        fill: false,
        borderColor: '#9f7411',
        tension: 0.1,
      }, {
        label: 'AvailableRam',
        data: Object.values(list['AvailableRam']).map(value => value / 1000),
        fill: false,
        borderColor: '#9f7411',
        tension: 0.1,
      }, {
        label: 'TotalRam',
        data: Object.values(list['TotalRam']).map(value => value / 1000),
        fill: false,
        borderColor: '#9f7411',
        tension: 0.1,
      }],
    };
    avgData = {
      labels: Object.keys(list['Avg1M']).map(value => new Date(Date.parse(value)).toLocaleTimeString()),
      datasets: [{
        label: 'Avg1M',
        data: Object.values(list['Avg1M']),
        fill: false,
        borderColor: '#9f7411',
        tension: 0.1,
      }, {
        label: 'Avg5M',
        data: Object.values(list['Avg5M']),
        fill: false,
        borderColor: '#9f7411',
        tension: 0.1,
      }, {
        label: 'Avg15M',
        data: Object.values(list['Avg15M']),
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
