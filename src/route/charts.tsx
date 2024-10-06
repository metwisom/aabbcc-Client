import '../App.css';
import {useGetDataMutation, useGetDataQuery} from '../services/data.ts';
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

function formatIsoStringToDateAndTime(isoString: string) {
    const date = new Date(new Date(isoString).valueOf() - 1000 * 60 * 60 * 3)


    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

function Charts() {
    const dispatch = useDispatch()
    const {data: aspects,refetch} = useGetDataQuery();
    // const aspects = useData()

    let timeout: number;

    useEffect(() => {
        timeout = setInterval(async () => {
            refetch()
        }, 1200)
        return () => {
            clearTimeout(timeout)
        }
    }, []);


    const list: Record<string, Record<string, string>> = {};
    let data: ChartData<'line'> | undefined = undefined;
    let avgData: ChartData<'line'> | undefined = undefined;
    // console.log(aspects)
    if (aspects && aspects.items.length > 0) {
        aspects.items.map(aspect => {
            if (list[aspect.aspect] == undefined) {
                list[aspect.aspect] = {};
            }
            list[aspect.aspect][aspect.time] = aspect.value;
            if (new Date(localStorage.getItem('max')).valueOf() < new Date(aspect.time).valueOf()) {
                localStorage.setItem('max', formatIsoStringToDateAndTime(aspect.time))
            }
        });

        data = {
            labels: Object.keys(list['AvailableRam']).map(value => new Date(Date.parse(value)).toLocaleTimeString()),
            datasets: [
                {
                    label: 'Temp',
                    data: Object.values(list['Temp']).map(value => parseFloat(value) * 1000),
                    fill: false,
                    borderColor: '#9f7411',
                    tension: 0.1,
                },
                {
                    label: 'Hum',
                    data: Object.values(list['Hum']).map(value => parseFloat(value) * 1000),
                    fill: false,
                    borderColor: '#9f7411',
                    tension: 0.1,
                },{
                label: 'FreeRam',
                data: Object.values(list['FreeRam']).map(value => parseFloat(value) / 1000),
                fill: false,
                borderColor: '#9f7411',
                tension: 0.1,
            }, {
                label: 'AvailableRam',
                data: Object.values(list['AvailableRam']).map(value => parseFloat(value) / 1000),
                fill: false,
                borderColor: '#9f7411',
                tension: 0.1,
            }, {
                label: 'TotalRam',
                data: Object.values(list['TotalRam'] || []).map(value => parseFloat(value) / 1000),
                fill: false,
                borderColor: '#9f7411',
                tension: 0.1,
            }],
        };
        avgData = {
            labels: Object.keys(list['Avg1M']).map(value => new Date(Date.parse(value)).toLocaleTimeString()),
            datasets: [{
                label: 'Avg1M',
                data: Object.values(list['Avg1M']).map(value => parseFloat(value)),
                fill: false,
                borderColor: '#9f7411',
                tension: 0.1,
            }, {
                label: 'Avg5M',
                data: Object.values(list['Avg5M']).map(value => parseFloat(value)),
                fill: false,
                borderColor: '#9f7411',
                tension: 0.1,
            }, {
                label: 'Avg15M',
                data: Object.values(list['Avg15M']).map(value => parseFloat(value)),
                fill: false,
                borderColor: '#9f7411',
                tension: 0.1,
            }],
        };

    }


    return (
        <>
            {data ? <Line options={{
                animations: {
                    tension: {
                        duration: 0,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        loop: false
                    }
                }
            }} data={data}/> : <></>}
            {avgData ? <Line data={avgData}/> : <></>}

            {/*{JSON.stringify(posts)}*/}
        </>
    );
}

export default Charts;
