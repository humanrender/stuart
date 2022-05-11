## Considerations

I used next.js to speed up the bootstraping process.

Been a while since I programmed something, it was fun going back to it but I had to prepare my environment and lost quite some time and couldn't spend as much time as I wanted.

The app has been tested in node 14.9.2 and 16.15.0. Developed initiallly with yarn but can be executed with npm

## How to run

### Dev server

- npm install
- npm run dev

### Build

- npm install
- npm run build
- npm run start

## Notes

- Components are all grouped in src/components. Would have organized them better in a real project. Same goes for styles in styles/components.
- Common types like `GeocodeCoordinates` shall be in a more accesible place instead of being on AddressInput.
- Would have liked to add more testing, but the time was tight.
- Didn't do the GMaps integration from scratch, I had to get a lot of tools ready to develop. I spent quite some time getting my environment ready.
- The communication between components could have been handled better with context or redux, but didnt want to overengineer.
- Common behaviors; like the calls to the server; could have been handled in their own custom  hook.
