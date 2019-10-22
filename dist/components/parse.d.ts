import { RawComponentsData, Component } from "../types";
export declare const parseComponents: (rawComponents: {
    [x: string]: RawComponentsData;
}) => readonly Component[];
