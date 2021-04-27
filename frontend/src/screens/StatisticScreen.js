import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatisticProducts } from '../actions/product.actions.js'
import { Bar, Pie } from 'react-chartjs-2';
import { Row } from 'react-bootstrap';


const StatisticScreen = () => {


    const dispatch = useDispatch()
    const { data } = useSelector(state => state.productStatistic)
    console.log(data)
    useEffect(() => {
        dispatch(StatisticProducts())
    }, [dispatch])

    return (
        <>
            <Row>
                <Bar
                    data={{
                        labels: data?.data?.topOrder && data.data.topOrder.map(x => x._id.productName),
                        datasets: [{
                            label: 'Number of contributions',
                            data: data?.data?.topOrder && data.data.topOrder.map(x => x.count),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    }}
                    height={400}
                    width={600}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "white",
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "white",
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend: {
                            display: false,
                        }
                    }}
                />
            </Row>
            <Row>
                <Bar
                    data={{
                        labels: data?.data?.topRating && data.data.topRating.map(x => x.productName),
                        datasets: [{
                            label: 'Number of contributions',
                            data: data?.data?.topRating && data.data.topRating.map(x => x.rating),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    }}
                    height={400}
                    width={600}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "white",
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "white",
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend: {
                            display: false,
                        }
                    }}
                />
            </Row>
        </>
    )
}

export default StatisticScreen
