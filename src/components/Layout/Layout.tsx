/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from "react";
import Toolbar from "../Toolbar/Toolbar";
import { layout } from "./layout.module.scss";

const Layout: FC = ({ children }) => {
    return (
        <div className={layout}>
            <Toolbar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
