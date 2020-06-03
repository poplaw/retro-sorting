import React, { FC } from "react";
import "../styles/index.scss";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import BarChart from "../components/BarChart";
import { useSelector } from "react-redux";
import { getDataset } from "../features/dataset/datasetSlice";

const IndexPage: FC = () => {
    const dataset = useSelector(getDataset);

    return (
        <Layout>
            <SEO title="Home" />
            <BarChart dataset={dataset} />
        </Layout>
    );
};

export default IndexPage;
