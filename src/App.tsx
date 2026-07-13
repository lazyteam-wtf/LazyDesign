import {
  Activity,
  ArrowUpRight,
  Boxes,
  CircuitBoard,
  Command,
  Crosshair,
  Database,
  GitBranch,
  Layers3,
  Moon,
  PanelLeft,
  Play,
  Radar,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMeta,
  CardTitle,
  Heading,
  Icon,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components";
import { createLazyMotion } from "./motion";
import { lazyGsapMotionAdapter } from "./motion/gsap";
import { Box, Stack, Text } from "./primitives";
import { LazyProvider } from "./react";
import { normalizeHex, type LazyMode } from "./core";

const motion = createLazyMotion({ adapter: lazyGsapMotionAdapter });

const navItems = [
  { label: "Command", icon: Command, active: true },
  { label: "Systems", icon: CircuitBoard },
  { label: "Deploys", icon: GitBranch },
  { label: "Data Plane", icon: Database },
  { label: "Review", icon: ShieldCheck },
];

const pipelines = [
  { name: "Token resolver", status: "Synced", load: 92, tone: "primary" },
  { name: "Motion runtime", status: "Stable", load: 84, tone: "secondary" },
  { name: "Contrast guard", status: "AA pass", load: 97, tone: "primary" },
  { name: "Component registry", status: "Expanding", load: 71, tone: "neutral" },
] as const;

const workItems = [
  { id: "LD-401", title: "Resolve monochrome zinc surfaces", owner: "Theme", state: "Active" },
  { id: "LD-417", title: "Tune press spring against compact controls", owner: "Motion", state: "Review" },
  { id: "LD-428", title: "Promote Tabs and Tooltip to component layer", owner: "React", state: "Merged" },
  { id: "LD-436", title: "Prototype LazyTeam.wtf workflow cockpit", owner: "Product", state: "Active" },
];

const metrics = [
  { label: "Surface delta", value: "1px", detail: "border hierarchy" },
  { label: "Motion frame", value: "150ms", detail: "micro feedback" },
  { label: "AA coverage", value: "98%", detail: "contrast checks" },
  { label: "Density", value: "0.86", detail: "compact grid" },
];

export function App() {
  const [mode, setMode] = useState<LazyMode>("dark");
  const [seed, setSeed] = useState("#6d7cff");
  const [density, setDensity] = useState<"standard" | "compact">("compact");

  const theme = useMemo(
    () => ({
      density,
      mode,
      seed: normalizeHex(seed),
      style: "linear" as const,
    }),
    [density, mode, seed],
  );

  useEffect(() => {
    const playback = motion.scroll(".ltw-reveal", "reveal", {
      start: "top 88%",
      scrub: 0.35,
    });

    return () => playback.cancel();
  }, []);

  return (
    <LazyProvider className="ltw-root" theme={theme}>
      <TooltipProvider>
        <div className="ltw-shell">
          <aside className="ltw-sidebar" aria-label="LazyTeam workspace navigation">
            <a className="ltw-brand" href="#command">
              <span className="ltw-brand__mark">
                <Icon glyph={Sparkles} />
              </span>
              <span>
                <strong>LazyTeam.wtf</strong>
                <small>Design Ops Console</small>
              </span>
            </a>

            <nav className="ltw-nav">
              {navItems.map((item) => (
                <a className={item.active ? "ltw-nav__item is-active" : "ltw-nav__item"} href="#command" key={item.label}>
                  <Icon glyph={item.icon} />
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            <Card padding="sm" className="ltw-rail-card">
              <Stack gap="2">
                <Badge intent="primary" variant="soft" iconStart={<Icon name="check" />}>
                  v0.5 active
                </Badge>
                <Text tone="muted" variant="body-sm">
                  Token runtime, Radix behavior, and LazyMotion are now driving the same interface.
                </Text>
              </Stack>
            </Card>
          </aside>

          <main className="ltw-main" id="command">
            <header className="ltw-topbar">
              <Input
                aria-label="Search LazyTeam command center"
                className="ltw-command"
                iconStart={<Icon glyph={Search} />}
                placeholder="Search tokens, components, routes..."
              />
              <div className="ltw-actions">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      aria-label="Toggle density"
                      iconStart={<Icon glyph={PanelLeft} />}
                      onClick={() => setDensity(density === "compact" ? "standard" : "compact")}
                      size="sm"
                      variant="outline"
                    >
                      {density}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Switch control density</TooltipContent>
                </Tooltip>
                <Button
                  aria-label="Toggle color mode"
                  iconStart={<Icon glyph={mode === "dark" ? Sun : Moon} />}
                  onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                  size="sm"
                  variant="outline"
                >
                  {mode}
                </Button>
              </div>
            </header>

            <section className="ltw-hero ltw-reveal">
              <Stack gap="4">
                <div className="ltw-kicker">
                  <Badge intent="secondary" variant="soft" iconStart={<Icon glyph={Radar} />}>
                    Digital Industrialism
                  </Badge>
                  <Badge variant="outline">Monet seed {seed.toUpperCase()}</Badge>
                </div>
                <div className="ltw-hero__copy">
                  <Heading level={1}>A precision cockpit for adaptive interface systems.</Heading>
                  <Text tone="muted" variant="body-lg">
                    LazyDesign now renders a working SaaS-grade command surface: strict zinc surfaces, semantic
                    dynamic color, Radix behavior, and adapter-safe motion running through one token contract.
                  </Text>
                </div>
              </Stack>
              <Card className="ltw-theme-card" padding="md">
                <CardHeader>
                  <CardTitle>Theme engine</CardTitle>
                  <CardDescription>Brand color becomes an entire restrained UI system.</CardDescription>
                </CardHeader>
                <CardContent>
                  <label className="ltw-color-control">
                    <span>Seed</span>
                    <input
                      aria-label="Theme seed color"
                      onChange={(event) => setSeed(event.target.value)}
                      type="color"
                      value={seed}
                    />
                    <code>{seed.toUpperCase()}</code>
                  </label>
                  <div className="ltw-swatches" aria-label="Resolved color roles">
                    {["primary", "surface", "container", "outline"].map((role) => (
                      <span data-role={role} key={role}>
                        {role}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="ltw-grid ltw-reveal" aria-label="System metrics">
              {metrics.map((metric) => (
                <Card interactive key={metric.label} padding="sm">
                  <CardMeta>{metric.label}</CardMeta>
                  <Text className="ltw-metric" variant="heading-lg">
                    {metric.value}
                  </Text>
                  <Text tone="muted" variant="body-sm">
                    {metric.detail}
                  </Text>
                </Card>
              ))}
            </section>

            <Tabs className="ltw-workspace ltw-reveal" defaultValue="ops">
              <TabsList aria-label="LazyTeam cockpit sections">
                <TabsTrigger value="ops">Operations</TabsTrigger>
                <TabsTrigger value="motion">Motion Grid</TabsTrigger>
                <TabsTrigger value="tokens">Token Stack</TabsTrigger>
              </TabsList>

              <TabsContent value="ops">
                <div className="ltw-panel-grid">
                  <Card className="ltw-flow-card" padding="md">
                    <CardHeader>
                      <CardMeta>Live workflow</CardMeta>
                      <CardTitle>Interface build pipeline</CardTitle>
                      <CardDescription>Every layer resolves downward before a component paints a pixel.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="ltw-pipeline">
                        {pipelines.map((pipeline) => (
                          <PipelineRow key={pipeline.name} pipeline={pipeline} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card padding="md">
                    <CardHeader>
                      <CardMeta>Queue</CardMeta>
                      <CardTitle>Component workstream</CardTitle>
                      <CardDescription>Composable pieces, not preset-heavy black boxes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="ltw-issue-list">
                        {workItems.map((item) => (
                          <div className="ltw-issue" key={item.id}>
                            <code>{item.id}</code>
                            <span>{item.title}</span>
                            <Badge size="sm" variant="outline">
                              {item.owner}
                            </Badge>
                            <Badge size="sm" intent={item.state === "Merged" ? "primary" : "neutral"}>
                              {item.state}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="motion">
                <div className="ltw-panel-grid">
                  <Card padding="md">
                    <CardHeader>
                      <CardMeta>Micro physics</CardMeta>
                      <CardTitle>Control mass calibration</CardTitle>
                      <CardDescription>Controls react quickly, then settle without ornamental bounce.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="ltw-control-lab">
                        <Button intent="primary" iconStart={<Icon glyph={Play} />} motion="press">
                          Run sequence
                        </Button>
                        <Button iconStart={<Icon glyph={Zap} />} motion="soft" variant="outline">
                          Soft hover
                        </Button>
                        <Button iconStart={<Icon glyph={Settings2} />} variant="ghost">
                          Calibrate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card padding="md">
                    <CardHeader>
                      <CardMeta>Macro rhythm</CardMeta>
                      <CardTitle>Scroll-triggered information flow</CardTitle>
                      <CardDescription>Page sections reveal through LazyMotion with the GSAP adapter behind the API.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="ltw-motion-bars" aria-hidden="true">
                        {[48, 72, 58, 86, 64, 78].map((height, index) => (
                          <span key={height} style={{ "--bar-height": `${height}%`, "--bar-index": index } as CSSProperties} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tokens">
                <div className="ltw-token-stack">
                  {[
                    ["Source", "Brand seed normalized through Monet"],
                    ["Semantic", "Accessible roles on zinc surfaces"],
                    ["Component", "Card, Tabs, Tooltip, Button, Input"],
                    ["Runtime", "CSS variables and adapter-safe motion"],
                  ].map(([title, body]) => (
                    <Card interactive key={title} padding="sm">
                      <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{body}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <section className="ltw-bottom ltw-reveal">
              <Card padding="md">
                <CardHeader>
                  <CardMeta>Library surface</CardMeta>
                  <CardTitle>Developer contract</CardTitle>
                </CardHeader>
                <CardContent>
                  <Box className="ltw-code" as="pre">
                    <code>{`<LazyProvider theme={{ seed: "${seed}", mode: "${mode}", density: "${density}" }}>
  <Tabs defaultValue="ops">
    <Card interactive>
      <Button intent="primary" motion="press" />
    </Card>
  </Tabs>
</LazyProvider>`}</code>
                  </Box>
                </CardContent>
              </Card>

              <Card padding="md">
                <CardHeader>
                  <CardMeta>Design guardrails</CardMeta>
                  <CardTitle>Flat-first by construction</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack gap="3">
                    {["1px border hierarchy", "No default glass layer", "Semantic color only", "Reduced motion aware"].map(
                      (item) => (
                        <div className="ltw-check" key={item}>
                          <Icon glyph={Crosshair} tone="primary" />
                          <span>{item}</span>
                        </div>
                      ),
                    )}
                  </Stack>
                </CardContent>
                <CardFooter>
                  <Badge intent="primary" iconStart={<Icon glyph={Activity} />}>
                    system online
                  </Badge>
                  <Button iconEnd={<Icon glyph={ArrowUpRight} />} size="sm" variant="ghost">
                    Inspect
                  </Button>
                </CardFooter>
              </Card>
            </section>
          </main>
        </div>
      </TooltipProvider>
    </LazyProvider>
  );
}

function PipelineRow({
  pipeline,
}: {
  pipeline: (typeof pipelines)[number];
}) {
  return (
    <div className="ltw-pipeline-row">
      <div>
        <Icon glyph={pipeline.tone === "primary" ? Layers3 : Boxes} tone={pipeline.tone === "primary" ? "primary" : "muted"} />
        <span>{pipeline.name}</span>
      </div>
      <Badge intent={pipeline.tone} size="sm" variant="outline">
        {pipeline.status}
      </Badge>
      <div className="ltw-progress" aria-label={`${pipeline.name} ${pipeline.load}%`}>
        <span style={{ inlineSize: `${pipeline.load}%` }} />
      </div>
    </div>
  );
}
