function confirmActivate(name) {
  return confirm(`Are you sure you want to activate ${name}? This will allow the user to use the system.`);
}

function confirmDeactivate(name) {
  return confirm(`Are you sure you want to deactivate ${name}? This will prevent the user from using the system.`);
}
