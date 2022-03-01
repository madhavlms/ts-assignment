import React from "react";
import "../../App.css";

interface TempTrackerProps { };
interface TempTrackerState {
    temp: number;
    temps: number[];
}

function get_max(temperatures: number[]) {
    return Math.max(...temperatures);
};

function get_min(temperatures: number[]) {
    return Math.min(...temperatures);
};

function get_mean(temperatures: number[]) {
    const divider = temperatures.length;
    const sum = temperatures.reduce((prev, curr) => prev + curr, 0);
    return (sum / divider).toFixed(2);
};

function get_mode(temperatures: number[]) {
    // Create Unique ARRAY
    const unqiueTemp = Array.from(new Set(temperatures));
    if (unqiueTemp.length === temperatures.length) return "No Mode";
    else {
        const countsArr = unqiueTemp.map((temp) => {
            return temperatures.filter((t) => t === temp)?.length;
        });
        const maxCount = Math.max(...countsArr);
        // Indexing of max count is same index of uniq temp
        return unqiueTemp?.[countsArr.indexOf(maxCount)];
    }
}

class TempTracker extends React.Component<TempTrackerProps, TempTrackerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            temps: [],
            temp: 0
        }
    };

    handleTemp = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const value = parseInt((event.target as HTMLInputElement).value);
        if (value && value < 151)
            this.setState({ temp: value });
    };

    insert = () => {
        const { temp, temps: tempArr } = this.state;
        tempArr.push(temp);
        this.setState({ temps: tempArr });
        // alert("INSERTED");
    };

    render() {
        const { temp, temps } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <label>
                        <div className="mb-1">Insert Temp</div>
                        <input type="number" placeholder="Enter Temperature" value={temp} onChange={this.handleTemp} />
                    </label>
                </div>
                <button className="row" onClick={this.insert}>Insert</button>

                {
                    !!temps?.length &&
                    <div style={{marginTop : "5px"}}>
                        <div className="row">
                            INSERTED TEMPS :
                            {temps.map((t,idx) => <span className="mx-5" key={idx}>{t}&#176;C</span>)}
                        </div>
                        <div className="row">
                            Max : {get_max(temps)}
                        </div>
                        <div className="row">
                            Min : {get_min(temps)}
                        </div>
                        <div className="row">
                            Mean : {get_mean(temps)}
                        </div>
                        <div className="row">
                            Mode : {get_mode(temps)}
                        </div>
                    </div>
                }
            </div>
        )
    }
};

export default TempTracker;