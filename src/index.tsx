import { serveStatic } from "@hono/node-server/serve-static"
import { Button, Frog } from "frog"
// import { neynar } from 'frog/hubs'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.use("/*", serveStatic({ root: "./public" }))

/**
 * @dev Initial -- plain HTML component
 */
app.frame("/", (c) => {
  return c.res({
    action: "/working",
    image: (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#fff",
          padding: "1rem",
          fontSize: "2rem"
        }}
      >
        Welcome!
      </div>
    ),
    intents: [<Button>See working component</Button>]
  })
})

/**
 * @dev Working -- custom component with child
 */
app.frame("/working", (c) => {
  return c.res({
    action: "/issue",
    image: <FrameContainer>It works!</FrameContainer>,
    intents: [<Button>Trigger issue</Button>]
  })
})

/**
 * @dev Issue -- custom self closing component
 *      - This component is not working as expected
 */
app.frame("/issue", (c) => {
  return c.res({
    action: "/",
    image: <Issue />,
    intents: [<Button>Nothing displayed - Go back</Button>]
  })
})

function Issue() {
  return <FrameContainer>Issue here!</FrameContainer>
}

function FrameContainer({ children }: { children?: JSX.Element | string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff",
        padding: "1rem",
        fontSize: "2rem"
      }}
    >
      {children}
    </div>
  )
}
