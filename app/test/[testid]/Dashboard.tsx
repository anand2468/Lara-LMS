import { MongoService } from "@/app/(others)/services/mongodbService";
import { Tdata } from "./TestArea";
import styles from "./Dashboard.module.css";

export default async function Dashboard({testid, topics, title}: {testid:string, topics: Tdata[], title:string}) {
    const mongo = new MongoService();
    mongo.collectionName = "results";
    let results:any[]|undefined = undefined;
    try{
        const curr = await mongo.connect();
        const data = curr.find({ testid: testid }).toArray();
        if (!data) {
            throw new Error("No data found for the given test ID");
        }
        // topicsList = topics.map((topic: any) => topic.topics);
        results = await data;
    }catch (error:any) {
        return <div>Error fetching data: {error.message}</div>;
    }

    return (
        <div >
            <header className={`p-3 mb-[100px] bg-purple-700 ` }>
                <h1 className="text-2xl text-center font-extrabold text-white">Test Dashboard Page</h1>
                <h2 className="text-xl text-center text-white">Results for Test: {title}</h2>
            </header>
            <div className="lg:w-[80%] w-[90%] m-auto">
                { results && results.length > 0 ? (
                <div className="m-4" >
                    <table className={styles.resultsTable}>
                        <thead>
                            <tr>
                                <th>rank</th>
                                <th>username</th>
                                <th>Score</th>
                                {topics.map((topic: Tdata) => (
                                    <th key={topic._id}>{topic.topic}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {results.map((result: any, index:number) => (
                                <tr key={result._id.toString()}>
                                    <td className={styles.rankCell}>{index + 1}</td>
                                    <td className={styles.userNameCell}>{result.user}</td>
                                    <td className={styles.scoreCell}>{result.total}</td>
                                    {topics.map((topic: Tdata) => (
                                        <td key={topic._id} className={styles.scoreCell}>
                                            {result[topic.topic] || "N/A"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                    ) : (
                    <p>No results found for this test.</p>
                )}
            </div>

        </div>
    );
}

// <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>