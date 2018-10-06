/**
Returns direction instance

 */
const getDirections = (from: string, to: string, departureTime: string) =>
  Maps.newDirectionFinder()
    .setOrigin(from)
    .setDestination(to)
    .setLanguage("ja")
    .setDepart(new Date(departureTime))
    .setMode(Maps.DirectionFinder.Mode.TRANSIT)
    .getDirections();

/**
Returns cost to get from A to B departing at some specific time

@customfunction
 */
const getCost = (from: string, to: string, departureTime: string): number => {
  const directions = getDirections(from, to, departureTime);
  const cost = directions.routes.reduce(
    (total, route) => (route.fare ? route.fare.value : 0) + total,
    0
  );
  return cost;
};

/**
Retunrs duration to get from A to B departing at some specific time

@customfunction
 */
const getDuration = (
  from: string,
  to: string,
  departureTime: string
): number => {
  const directions = getDirections(from, to, departureTime);
  const duration = directions.routes.reduce(
    (total, route) =>
      route.legs.reduce((total, leg) => total + leg.duration.value, 0),
    0
  );
  return duration / 60;
};
