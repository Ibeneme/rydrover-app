import PageHeader from "../components/PageHeader";
import LiveRides from "../components/LiveRides";
import CtaBand from "../components/CtaBand";

export const metadata = { title: "Find a ride | RydRover" };

export default function FindRidePage() {
  return (
    <>
      <PageHeader tag="Find ride" title="Pick a cab and split the fare" sub="Search your route, see live seats and join a ride that is already filling up." />
      <LiveRides />
      <CtaBand />
    </>
  );
}
