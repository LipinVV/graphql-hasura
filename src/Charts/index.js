import {Chart} from "react-google-charts";
import {useQuery} from "@apollo/client";
import {GET_USERS_QUERY} from "../graphql/queries";
import React from "react";
import {palette} from "../theme/theme";

export const options = {
    title: "Users in our team",
    backgroundColor: palette.one
};


export const Charts = () => {
    const {loading, error, data} = useQuery(GET_USERS_QUERY);
    const countedRoles = data?.users.map(user => user.role).reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {});
    const typeOfChart = ['Role', 'PersonPerRole']
    const roleChart = countedRoles && [typeOfChart].concat(Object.entries(countedRoles));

    if (error) return <div>Something went wrong</div>
    if (loading) return <div>Loading users...</div>

    return (
        <Chart
            chartType="PieChart"
            data={roleChart}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    )
}
