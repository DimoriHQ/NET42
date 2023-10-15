export const checkpoints = async (checkpoints, total_distance) => {
    let action = "checkpoints: {";
    for (let idx = 0; idx < checkpoints.length; idx++) {
        action += `\n\t"${checkpoints[idx]}": ${checkpoints[idx] < total_distance},`
    }
    action += "\n}";
    return action;
  };