import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Form, Row, Col, Toast, Button } from 'react-bootstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import API from './api.json';

let networkSeries, chart;
export default function Graph() {
    am4core.ready(() => {
        chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
        networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());
    });
    const [chartData, setchartData] = useState([]);
    const boy = "#03D0FE";
    const girl = "#FE03EF";
    useEffect(() => {
        getData();
    }, []);

    am4core.useTheme(am4themes_animated);

    const getData = () => {
        const guessGetUrl = API.guess.get;
        axios.get(guessGetUrl).then((response) => {
            formatData(response.data);
        });
    };


    function formatData(data) {
        data = data.map(el => {
            return {
                ...el,
                value: 70,
            }
        });
        console.log("data: ", data);
        const maleArray = data.filter(el => el.gender === 'male');
        const femaleArray = data.filter(el => el.gender === 'female');
        setchartData([
            {
                name: "Boy",
                value: maleArray.length * 40 || 50,
                children: maleArray,
            },
            {
                name: "Girl",
                value: femaleArray.length * 40 || 50,
                children: femaleArray,
                color: '#fffff'
            }
        ]);
    }
    if (chartData != chart.data)
        chart.data = chartData;

    networkSeries.colors.list = [
        am4core.color(boy),
        am4core.color(girl).lighten(0.5),
    ];
    // networkSeries.maxLevels = 1;

    // Expand single level only
    networkSeries.nodes.template.expandAll = false;
    networkSeries.nodes.template.fill = "#fffff";
    networkSeries.dataFields.value = "value";
    networkSeries.dataFields.name = "name";
    networkSeries.dataFields.children = "children";

    if (networkSeries.dataFields.name == 'male') {
        return am4core.color("#00000");
    }
    networkSeries.nodes.template.tooltipText = "{name}";
    networkSeries.nodes.template.fillOpacity = 1;

    networkSeries.nodes.template.label.text = "{name}"
    networkSeries.fontSize = 20;

    networkSeries.links.template.strokeWidth = 2;

    var hoverState = networkSeries.links.template.states.create("hover");
    hoverState.properties.strokeWidth = 3;
    hoverState.properties.strokeOpacity = 1;

    networkSeries.nodes.template.events.on("over", function (event) {
        event.target.dataItem.childLinks.each(function (link) {
            link.isHover = true;
        })
        if (event.target.dataItem.parentLink) {
            event.target.dataItem.parentLink.isHover = true;
        }

    })

    networkSeries.nodes.template.events.on("out", function (event) {
        event.target.dataItem.childLinks.each(function (link) {
            link.isHover = false;
        })
        if (event.target.dataItem.parentLink) {
            event.target.dataItem.parentLink.isHover = false;
        }
    })

    return (
        <div >
            {chartData && (
                <div id="chartdiv"></div>
            )}
        </div>
    )
}
