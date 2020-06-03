import React, { FC } from "react";
import "../styles/index.scss";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import BarChart from "../components/BarChart";

const IndexPage: FC = () => (
    <Layout>
        <SEO title="Home" />
        <BarChart />
    </Layout>
);

export default IndexPage;
