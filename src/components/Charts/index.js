import React from "react";
import {Chart} from "react-google-charts";
import {useQuery} from "@apollo/client";
import {GET_USERS_QUERY} from "../../graphql/queries";
import {palette} from "../../theme/theme";
import {ErrorScreen} from "../ErrorScreen";
import {LoadingScreen} from "../LoadingScreen";
import './charts.css';

export const options = {
    title: "Users in our team",
    backgroundColor: palette.chartBG,
};


export const Charts = () => {
    const {loading, error, data} = useQuery(GET_USERS_QUERY);
    const countedRoles = data?.users.map(user => user.role).reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {});
    const typeOfChart = ['Role', 'PersonPerRole']
    const roleChart = countedRoles && [typeOfChart].concat(Object.entries(countedRoles));

    if (error) return <ErrorScreen />
    if (loading) return <LoadingScreen entity={'charts'} />

    return (
        <div className='charts'>
            <h1 className='charts__header'>Charts</h1>
            <Chart
                chartType="PieChart"
                data={roleChart}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>
    )
}
