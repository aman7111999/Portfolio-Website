export type ProjectStoryOverride = {
  short_description?: string;
  overview?: string;
  problem_statement?: string;
  research?: string;
  design_process?: string;
  solution?: string;
  outcome?: string;
  learnings?: string;
  metrics?: { label: string; value: string; hint?: string }[];
};

export const PROJECT_STORY_PREVIEW: Record<string, ProjectStoryOverride> = {
  "portfolio-analysis": {
    short_description:
      "An investor's portfolio rarely lives in one place. I designed one analysis journey that brings internal and externally linked investments together, explains what needs attention, and turns insight into a useful next step.",
    overview:
      "<p>A portfolio rarely lives in one app. A user might hold stocks with Motilal Oswal, mutual funds elsewhere, and another broker account on the side. They could see each set of holdings, but they still had to do the hard part themselves: work out what the complete portfolio actually meant.</p><p>That created a product opportunity for RIISE. Instead of being another place to display investments, Portfolio Analysis could become the layer that helps users understand the whole picture and decide what to do next.</p><p>I led the experience from problem framing and information architecture through interaction design, high-fidelity UI, edge states, and design-system-aligned handoff.</p>",
    problem_statement:
      "<p>The user problem was not missing data. It was fragmented meaning. Different sources created different views of the same financial life, and dense metrics could easily become numbers without direction.</p><p>For the business, the challenge was equally important: if analysis stopped at diagnosis, users had little reason to stay engaged with RIISE after checking their holdings.</p><ul><li>Internal and external investments needed to feel like one portfolio without hiding where the data came from.</li><li>Stocks and mutual funds needed different analysis, but not different mental models.</li><li>Risk, concentration, valuation, and diversification had to be understandable without oversimplifying them.</li><li>Every important insight needed a credible next step instead of becoming a dead end.</li><li>Connecting external data required trust across consent, syncing, failure, empty, and partial-data states.</li></ul>",
    research:
      "<p>I started by auditing the existing portfolio, import, stock research, mutual-fund, and advisory journeys. Rather than organising the product around the data we already had, I mapped the questions an investor is trying to answer.</p><p>The same four needs kept appearing: <strong>Is this my complete picture?</strong> <strong>Is my portfolio healthy?</strong> <strong>What exactly needs attention?</strong> and <strong>What can I do about it?</strong></p><p>That changed the direction of the work. The data source could remain visible, but the user should never have to learn a different analysis experience for every source.</p>",
    design_process:
      "<p>I built the journey around those questions, moving from confidence in the data to confidence in the next decision.</p><ol><li><strong>Establish the scope.</strong> Overall, Motilal Oswal, and External views tell users exactly what is being analysed.</li><li><strong>Lead with the health of the portfolio.</strong> Allocation, diversification, risk, and attention areas appear before deep financial detail.</li><li><strong>Explain before expanding.</strong> Each metric tells the user why it matters, then lets them drill into the affected stocks or funds.</li><li><strong>Respect the asset.</strong> Stock and mutual-fund analysis use different signals where needed, while keeping the same reading pattern.</li><li><strong>Design the trust moments.</strong> Consent, syncing, partial data, failures, empty states, and light/dark modes were treated as part of the core journey, not edge-case cleanup.</li><li><strong>Close the loop.</strong> The experience ends with choices that match different levels of confidence: explore an IAP portfolio, speak with a relationship manager, or download the report.</li></ol>",
    solution:
      "<p>The final experience behaves less like a dashboard and more like a guided conversation with the portfolio.</p><p>It starts by showing what is being analysed, gives the user a quick health read, explains why a signal matters, reveals where the issue sits, and only then asks what they want to do next.</p><ul><li><strong>Unified portfolio scope</strong> across internal and externally linked investments.</li><li><strong>Plain-language interpretation</strong> beside financial metrics instead of leaving users to decode them.</li><li><strong>Progressive disclosure</strong> so deeper analysis appears when the user asks for it.</li><li><strong>Asset-aware diagnostics</strong> for stocks and mutual funds inside one consistent system.</li><li><strong>Action paths</strong> into IAP portfolios, relationship-manager support, and downloadable reports.</li></ul><p>The result keeps analytical depth without turning the page into a wall of data.</p>",
    outcome:
      "<p>The work gave RIISE a single portfolio-analysis model that can support investments held inside Motilal Oswal as well as portfolios brought in from outside.</p><p>For users, that means less mental stitching between brokers and a clearer path from a worrying number to the holding behind it. For the business, it creates a more useful reason to return to the portfolio and natural, contextual paths into advisory support and investment products without forcing a sales message into the analysis.</p><p>The product remains confidential, so I am keeping the case study focused on the experience architecture and business logic rather than attaching an unsupported conversion claim.</p>",
    learnings:
      "<p>A score can create attention, but it does not create confidence. The most important design work happened between the number and the action: explaining why a signal matters, showing where it comes from, and helping the user decide how much support they need.</p><p>I also learned that unifying data sources is an experience problem before it is a data problem. Users can accept multiple sources as long as the product gives them one stable mental model.</p>",
    metrics: [
      {
        value: "2 sources",
        label: "One portfolio story",
        hint: "Motilal Oswal and externally linked investments",
      },
      {
        value: "Stocks + MF",
        label: "Asset-aware analysis",
        hint: "Different signals inside one consistent mental model",
      },
      {
        value: "3 paths",
        label: "From insight to action",
        hint: "IAP portfolios, RM support, and report download",
      },
    ],
  },

  "riise-portfolio-revamp": {
    short_description:
      "As RIISE added more investment products, its portfolio became longer and harder to read. I redesigned the hierarchy so users could understand value, performance, allocation, and risk first while giving the business room to keep growing.",
    overview:
      "<p>The portfolio had a good problem: RIISE kept adding more ways to invest. Stocks, mutual funds, U.S. stocks, bonds, strategies, and other products all needed a place in the experience.</p><p>But the page had grown by stacking one more card every time the product grew. What worked for a smaller portfolio was becoming harder to scan, harder to extend, and harder to trust at a glance.</p><p>When I joined Motilal Oswal, we first strengthened the design system and applied it to RIISE. That improved consistency, but it also exposed the deeper issue. The portfolio did not only need a visual refresh. It needed a new reading order.</p>",
    problem_statement:
      "<p>Users came to the portfolio with a few basic questions: How much do I have? How is it performing? Where is the money? Is anything wrong? The interface made them work through repeated product cards to find those answers.</p><p>For the business, the same structure created a scaling problem. Every new asset class made the page longer and increased the cost of fitting another product into the experience.</p><ul><li>Total value, P&amp;L, allocation, and product-level detail competed for attention.</li><li>The same information repeated across several cards.</li><li>Important signals were visually equal to secondary information.</li><li>A design-system reskin could improve polish but could not fix the content hierarchy.</li></ul><p>The challenge became: <strong>How do we let the portfolio grow without making the user feel that growth as clutter?</strong></p>",
    research:
      "<p>I reviewed the existing journey screen by screen, compared patterns across leading wealth products, and reduced the page to the questions a user needs answered in the first few seconds.</p><ol><li>What is my portfolio worth?</li><li>How is it doing today and overall?</li><li>Where is my money invested?</li><li>Is anything asking for attention?</li><li>How do I move into a specific asset when I want more detail?</li></ol><p>That sequence became more useful than any visual benchmark. It gave us a clear test for every element on the page: does this help answer one of those questions now, or can it wait?</p>",
    design_process:
      "<p>The revamp happened in three stages, and each one taught us something different.</p><ol><li><strong>Make the old experience consistent.</strong> The new RIISE design system fixed typography, spacing, colour, components, and states. The page immediately felt more dependable.</li><li><strong>Notice what polish could not solve.</strong> Even with better UI, the same repeated-card model still made users scan too much.</li><li><strong>Rebuild the hierarchy.</strong> I moved the experience to one portfolio summary, scannable asset groups, and a clear separation between essential signals and secondary modules.</li></ol><p>I tested the structure against future growth as well as current screens. The goal was not a beautiful snapshot. It was a model that could accept another product later without returning to the same clutter.</p>",
    solution:
      "<p>The latest portfolio starts with the whole picture and reveals detail only as it becomes useful.</p><ul><li><strong>One connected summary</strong> for current value, invested value, and profit or loss.</li><li><strong>Overall, Motilal Oswal, and External views</strong> that preserve source context without splitting the experience.</li><li><strong>Scannable asset rows</strong> instead of repeating a full card for every investment type.</li><li><strong>Risk and performance signals</strong> placed before secondary exploration so attention has a clear priority.</li><li><strong>Supporting modules at the right depth</strong> for MTF borrowing, dividends, ideas, and other portfolio utilities.</li></ul><p>The page still contains rich financial data. The difference is that the user no longer has to process all of it at the same time.</p>",
    outcome:
      "<p>The revamp created more than a cleaner portfolio. It gave RIISE a structure that can support a wider product mix without making every new business line compete for another large card.</p><p>For users, the first screen now answers the important questions faster and makes deeper exploration optional. For the business, new investment products can enter a predictable hierarchy instead of forcing a redesign of the entire page.</p><p>The latest experience is still being rolled out, so I am not attaching an uplift figure. The verified change is a clearer reading order, less repetition, and a portfolio model designed to scale.</p>",
    learnings:
      "<p>The design system made the product consistent, but consistency did not make it simple. The real improvement came when we stopped treating every data point and every product as equally urgent.</p><p>I did not need to remove most of the information. I needed to decide when the user should see it.</p>",
    metrics: [
      {
        value: "5+ assets",
        label: "One portfolio structure",
        hint: "Stocks, funds, U.S. stocks, IAP, and more",
      },
      {
        value: "3 stages",
        label: "Product evolution",
        hint: "Original, systemised, and fully revamped",
      },
      {
        value: "1 hierarchy",
        label: "Built to scale",
        hint: "Summary first, detail when it becomes useful",
      },
    ],
  },

  "riise-first-time-user-journey": {
    short_description:
      "A new user arrives with no portfolio activity, while the business needs them to complete KYC, add funds, and trade. I designed the first session to prove RIISE's value before asking for each next commitment.",
    overview:
      "<p>A first-time investor opens RIISE with an empty portfolio. The business wants activation: complete KYC, get verified, add funds, and eventually place a first trade. But from the user's side, every one of those steps is effort before they have seen enough value to know whether the product is worth it.</p><p>I did not want onboarding to feel like a checklist standing between the user and the product. RIISE already had something useful to show first: research and market ideas.</p><p>I designed the journey around a simple exchange. Let users experience enough value to understand why RIISE matters, then make each setup request clearly connected to what it unlocks next.</p>",
    problem_statement:
      "<p>The risky version of this journey was easy to imagine: a new user lands on an empty home, sees several locked modules, gets asked for KYC, and leaves before they ever experience the product.</p><p>That is both a UX problem and an activation problem for the business.</p><ul><li>Asking for KYC immediately could feel like paperwork without a payoff.</li><li>Giving away every research call would remove the incentive to complete setup.</li><li>Locking everything would make the app feel empty.</li><li>Verification creates unavoidable waiting time that could turn into a dead end.</li><li>KYC, verification, funding, and first trade could easily compete as four different calls to action.</li></ul><p>The challenge was to keep one clear reason to continue at every stage without blocking exploration.</p>",
    research:
      "<p>I mapped the first session from the user's point of view instead of starting with the account-status backend.</p><ol><li>What can I do here before I sign everything?</li><li>Why is this platform worth setting up?</li><li>What will KYC unlock?</li><li>What can I do while verification is happening?</li><li>Once the account is ready, what should I do next?</li></ol><p>Those questions turned one onboarding funnel into five product states. That mattered because the homepage could stay familiar while only the next useful action changed.</p>",
    design_process:
      "<p>I used one principle throughout the journey: <strong>show value first, then ask for effort.</strong></p><ol><li><strong>Guest:</strong> keep research, products, and market ideas explorable so the app feels useful immediately.</li><li><strong>KYC:</strong> show a real research idea and make the locked value visible, so the request has a reason behind it.</li><li><strong>Verification:</strong> explain what is happening and keep the rest of the product open instead of turning waiting into a blank screen.</li><li><strong>Add funds:</strong> when the account is ready, shift the activation card to the single next step required to act.</li><li><strong>First trade:</strong> bring expert ideas forward at the moment the user can finally use them.</li></ol><p>The page structure stays stable across all five states and both themes, so progress feels like the product is opening up rather than changing into a different app.</p>",
    solution:
      "<p>The finished journey feels like a guided first session rather than a forced funnel.</p><ul><li><strong>Value is visible before commitment.</strong> Guests can understand what RIISE offers without completing setup first.</li><li><strong>One action owns the moment.</strong> The activation card changes with account status instead of showing multiple competing tasks.</li><li><strong>Locked content works as a preview, not a punishment.</strong> Users can see what deeper access contains.</li><li><strong>Waiting time stays useful.</strong> Verification keeps exploration open and expectations clear.</li><li><strong>The first trade is connected to research.</strong> The journey does not stop at funding; it helps users reach the first meaningful product action.</li></ul>",
    outcome:
      "<p>The project gives RIISE one activation model across guest, KYC, verification, funded, and trade-ready users instead of treating each state as a separate homepage problem.</p><p>For users, every stage has a visible benefit and one understandable next step. For the business, the flow creates a clearer progression from anonymous exploration to an active investing relationship, with each state ready to be measured separately once launched.</p><p>This is pre-launch work, so I am deliberately not claiming a conversion uplift yet.</p>",
    learnings:
      "<p>The strongest KYC copy was not a better sentence. It was a better product state. Once users could see the value waiting on the other side, the request needed much less persuasion.</p><p>Activation works better when progress feels like access expanding, not a list of compliance tasks being completed.</p>",
    metrics: [
      {
        value: "5 states",
        label: "One activation story",
        hint: "Guest, KYC, verification, funds, and first trade",
      },
      {
        value: "1 next step",
        label: "At every stage",
        hint: "Focused action without blocking exploration",
      },
      {
        value: "2 themes",
        label: "Same mental model",
        hint: "Light and dark experiences",
      },
    ],
  },

  "riise-hyper-personalisation": {
    short_description:
      "RIISE had five product lines competing on one homepage. I reframed it from a fixed catalogue into a prioritisation system that helps each user continue what matters now and discover what may matter next.",
    overview:
      "<p>RIISE brings Stocks, F&amp;O, Mutual Funds, U.S. Stocks, and Algo Trading into one platform. As the product grew, the homepage started behaving like a catalogue: every team had something important to show, so more modules kept competing for the same attention.</p><p>The user then had to do the personalisation themselves by scanning past things that were not relevant to find the one thing they came back for.</p><p>I led the homepage revamp and personalisation framework across problem framing, information architecture, interaction models, high-fidelity design, stakeholder alignment, and implementation review.</p>",
    problem_statement:
      "<p>A first-time investor, an active trader, and a mutual-fund customer could enter RIISE with completely different intentions but still see a very similar hierarchy.</p><p>For users, that increased cognitive load and made continuation harder. For the business, it created a different problem: product discovery became a fight for permanent homepage space instead of a relevance decision.</p><ul><li>Too many products competed above the fold.</li><li>Static ordering ignored recent behaviour, holdings, eligibility, and lifecycle.</li><li>New modules were added faster than the hierarchy could absorb them.</li><li>Teams needed common rules for why something should appear, not only where it should sit.</li></ul><p>The goal was not to hide products. It was to make relevance the organising principle.</p>",
    research:
      "<p>I audited the homepage as a system: every entry point, repeated module, dependency, and product obligation. I then mapped the signals already available to us, including lifecycle stage, portfolio activity, recent behaviour, and product eligibility.</p><p>The key insight was that personalisation was only one part of the problem. Before deciding what to recommend, we needed a stable answer to three questions: <strong>what should always be available, what should help the user continue, and what should the business help them discover next?</strong></p>",
    design_process:
      "<p>I reorganised the homepage into prioritised zones instead of a fixed stack of cards.</p><ol><li><strong>Protect the essentials.</strong> Persistent utilities and portfolio access stay predictable so personalisation never makes the app feel unfamiliar.</li><li><strong>Prioritise continuation.</strong> Recent activity, holdings, and unfinished tasks can move forward when they are likely to be useful now.</li><li><strong>Make discovery contextual.</strong> Products the user has not adopted appear when lifecycle, eligibility, or behaviour makes the suggestion relevant.</li><li><strong>Create rules, not one-off screens.</strong> Responsive templates and module rules let multiple teams add content without breaking hierarchy.</li><li><strong>Review the constraints early.</strong> Product, engineering, and compliance were involved before high-fidelity handoff so the logic stayed buildable.</li></ol>",
    solution:
      "<p>The proposed homepage works as a decision system rather than a static marketing surface.</p><ul><li>A contextual top area surfaces the user's most relevant holdings, tasks, or actions.</li><li>Continuation modules help returning users resume meaningful activity quickly.</li><li>Lifecycle-aware discovery introduces other RIISE products without giving every product permanent priority.</li><li>New-user states focus on understanding and confidence before advanced-product promotion.</li><li>Reusable module rules give product and engineering a shared way to decide what appears, when, and why.</li></ul><p>The intent is not to make every homepage unique. It is to make the hierarchy feel earned.</p>",
    outcome:
      "<p>The biggest output was a shared prioritisation framework, not a single personalised screen. Product teams gained a common way to reason about homepage placement, and engineering gained a clearer model for implementing relevance without turning each module into a special case.</p><p>For users, the model reduces the amount of irrelevant choice they have to filter through. For the business, it creates a more disciplined path for cross-product discovery while preserving a coherent homepage.</p><p>The work is still in progress, so I am keeping the outcome to decisions and system changes I can verify today.</p>",
    learnings:
      "<p>Personalisation became much easier once I stopped treating it as a recommendation problem. The harder and more valuable work was defining hierarchy, continuity, eligibility, and trade-offs before adding signals.</p><p>A personalised homepage should still feel like the same product tomorrow.</p>",
    metrics: [
      {
        value: "5",
        label: "Product lines",
        hint: "Stocks, F&O, Mutual Funds, U.S. Stocks, and Algo Trading",
      },
      {
        value: "3 zones",
        label: "A clearer hierarchy",
        hint: "Essentials, continuation, and discovery",
      },
      {
        value: "E2E",
        label: "Design ownership",
        hint: "Framing through implementation review",
      },
    ],
  },

  "screener-stock-discovery": {
    short_description:
      "Search works when you already know a stock. Screener was a 0-to-1 discovery product for users who knew the kind of opportunity they wanted but not the company name yet.",
    overview:
      "<p>RIISE already had search, research, and market content, but there was a gap between browsing ideas and finding a stock that matched a user's own criteria.</p><p>Search assumes you already know what to type. Tips give you someone else's answer. A screener could create a different behaviour: start with an investment question, narrow the market, compare what remains, and save the logic for later.</p><p>I led the product from early scope and information architecture through interaction design, prototypes, component definition, and developer handoff.</p>",
    problem_statement:
      "<p>Most screeners solve depth by exposing more controls. That works for experienced investors, but it can make the first screen intimidating for everyone else.</p><p>For the business, the opportunity was to create a high-intent discovery path that could connect market exploration to deeper research and eventually to an investment action.</p><ul><li>Beginners needed meaningful starting points instead of an empty filter builder.</li><li>Experienced users still needed control over financial criteria.</li><li>Changing a filter needed immediate, understandable feedback.</li><li>Comparison had to explain differences, not simply place more numbers side by side.</li><li>Useful screeners needed to become repeatable workflows, not one-session searches.</li></ul>",
    research:
      "<p>I audited common screener patterns, the discovery journeys already inside RIISE, and the financial attributes available in the platform. I also worked with product to identify the smallest 0-to-1 scope that would still feel like a complete product.</p><p>The strongest direction came from reframing filters as recognisable investment questions: value stocks, momentum opportunities, dividend candidates, sector leaders, and similar goals.</p><p>That gave less experienced users a place to start without taking flexibility away from advanced users.</p>",
    design_process:
      "<p>I designed two entry points that meet in the same product.</p><ol><li><strong>Start from an idea.</strong> Curated and trending screeners let users explore familiar strategies immediately.</li><li><strong>Build your own.</strong> A guided filter builder exposes criteria progressively instead of presenting the full complexity at once.</li><li><strong>Move from easy to advanced.</strong> Users can go deeper when they need more control without being forced there on day one.</li><li><strong>Compare meaningfully.</strong> The comparison view prioritises the ratios and differences that explain why one stock stands apart.</li><li><strong>Make good work reusable.</strong> Saved screeners can be revisited, duplicated, edited, and refined as the user's thinking changes.</li></ol><p>I prototyped the transitions between discovery, filtering, results, comparison, and saving so the product behaved as one workflow rather than a collection of screens.</p>",
    solution:
      "<p>The resulting product supports both fast exploration and deeper analysis.</p><ul><li>Ready-made screeners provide useful starting points.</li><li>A progressive builder makes active criteria and result changes easy to understand.</li><li>Easy and Advanced modes let capability grow with user confidence.</li><li>Stock comparison highlights meaningful differences before exposing the full data table.</li><li>AI-assisted explanation helps interpret the comparison without pretending to make the investment decision for the user.</li><li>Saved and duplicated screeners turn discovery into a repeatable habit.</li></ul>",
    outcome:
      "<p>I took Screener from an early concept to a build-ready product model with a clear path from beginner exploration to advanced filtering.</p><p>For users, it creates a way to discover stocks even when they do not know a company name. For the business, it adds a structured discovery surface between market interest, research, and eventual trading intent.</p><p>The product has not produced a publishable post-launch metric yet, so I am keeping the impact grounded in the product definition and handoff.</p>",
    learnings:
      "<p>An advanced product does not need fewer capabilities to feel simple. It needs a better first move, progressive control, and feedback that tells the user what changed when they changed a rule.</p>",
    metrics: [
      {
        value: "0→1",
        label: "Product definition",
        hint: "From architecture to developer handoff",
      },
      {
        value: "2 paths",
        label: "Discovery entry points",
        hint: "Curated screeners and custom creation",
      },
      {
        value: "Easy + Advanced",
        label: "Progressive complexity",
        hint: "Depth without an intimidating first screen",
      },
    ],
  },

  "portfolio-health-report": {
    short_description:
      "The business wanted more portfolio imports. Users had no reason to connect a broker just to see holdings they already had. I changed the value after import, and the adoption problem changed with it.",
    overview:
      "<p>Trinkerr had a portfolio-import feature, but importing was doing more work for the product than it was for the user. Someone with one broker could already open their broker app and see the same holdings.</p><p>Yet connecting a financial account asks for trust, attention, and permission. We were asking users to pay that cost without showing a strong new benefit on the other side.</p><p>The business goal was to increase portfolio imports. Instead of starting with a shorter import flow, I reframed the problem: <strong>what would make importing genuinely worth doing?</strong></p>",
    problem_statement:
      "<p>The original flow optimised the action we wanted users to take, not the value they wanted to receive.</p><ul><li>Holdings alone did not differentiate Trinkerr from the broker app.</li><li>Broker connection introduced privacy and trust concerns.</li><li>Users could not see the value of the feature before committing.</li><li>Once imported, complex portfolio metrics could easily become another data dump.</li></ul><p>The user wanted an answer to a much more interesting question than “what do I own?” They wanted to know: <strong>is my portfolio actually healthy, and what should I pay attention to?</strong></p>",
    research:
      "<p>I mapped the existing import journey and the friction around connecting a broker, then worked with product to identify the insights that could make Trinkerr's portfolio meaningfully different from a holdings screen.</p><p>The important questions were surprisingly human: Am I outperforming? Am I overpaying for what I own? Is my risk concentrated? Is my portfolio balanced? Which holdings deserve a closer look?</p><p>That led to a simple shift: the report should not give users more numbers. It should give numbers context, comparison, and priority.</p>",
    design_process:
      "<p>I organised the report as a sequence of investor questions.</p><ol><li><strong>How am I performing?</strong> XIRR is compared with NIFTY 50 so the number has context.</li><li><strong>What am I paying for that performance?</strong> PE, PB, and PEG are interpreted against the market.</li><li><strong>How much risk am I carrying?</strong> Beta is explained through an approachable visual rather than a raw statistic.</li><li><strong>Where is my money concentrated?</strong> Stock, sector, and market-cap allocation show balance versus concentration.</li><li><strong>What needs attention first?</strong> Red flags lead from a portfolio-level warning to the specific holdings behind it.</li></ol><p>Broker pills let users move between individual accounts and the combined portfolio, while progressive disclosure keeps the first read calm.</p>",
    solution:
      "<p>The redesign connected the effort of importing directly to a payoff users could understand.</p><ul><li>An insight-led Portfolio Health Report appears after connection instead of another holdings list.</li><li>Financial metrics sit beside benchmarks and plain-language interpretation.</li><li>Allocation views explain concentration rather than asking users to infer it from a chart.</li><li>Red flags prioritise investigation instead of creating generic fear.</li><li>A demo health report lets users experience the value before they connect a broker at all.</li></ul><p>That last decision mattered most: we stopped asking users to trust the promise of value and started showing it.</p>",
    outcome:
      "<p>The Portfolio Health Report contributed to a <strong>9× increase in portfolio imports</strong> after launch.</p><p>We then added the demo report so users could understand the experience before connecting a broker. That contributed a further <strong>1.2× lift</strong>.</p><p>The business result came from solving the user-value problem first. Once importing unlocked something meaningfully better than a holdings view, the conversion step needed much less persuasion.</p>",
    learnings:
      "<p>My first instinct was to improve the import flow. The better product decision was to improve the reason to import.</p><p>This project changed how I think about growth work: when a funnel step feels hard to optimise, the highest-leverage design move may be somewhere after the funnel.</p>",
    metrics: [
      {
        value: "9×",
        label: "Increase in portfolio imports",
        hint: "After launching the insight-led health report",
      },
      {
        value: "1.2×",
        label: "Further lift",
        hint: "After adding the demo report before broker connection",
      },
      {
        value: "5",
        label: "Insight areas",
        hint: "Performance, valuation, risk, allocation, and red flags",
      },
    ],
  },

  "tiqs-design-system": {
    short_description:
      "As Trinkerr and TIQS grew, UI inconsistency became a product and delivery cost. I helped turn repeated design decisions into a shared system across iOS, Android, Figma, and engineering.",
    overview:
      "<p>As Trinkerr and TIQS shipped more features, the interface started carrying the history of how it had been built: similar components with different spacing, different names for the same pattern, theme inconsistencies, and states that depended on which file or developer you asked.</p><p>Users experienced that as uneven quality. Designers experienced it as rework. Engineers experienced it as interpretation during handoff.</p><p>TIQS 2.0 was our attempt to remove that tax by treating the design system as a shared product across design and development, not a Figma library cleanup.</p>",
    problem_statement:
      "<p>The old system had grown reactively around individual features. More components existed, but the rules for using them were less clear.</p><p>That created a business cost that did not show up on one screen: slower decisions, repeated implementation work, and more opportunities for the shipped product to drift from the intended experience.</p><ul><li>Similar patterns existed as separate components.</li><li>Light and dark themes were difficult to keep aligned.</li><li>Naming differences made components harder to discover and map to code.</li><li>States, accessibility guidance, and usage boundaries were inconsistently documented.</li><li>Figma and Storybook could diverge after handoff.</li></ul>",
    research:
      "<p>We audited repeated patterns across core investing journeys and grouped the problems into foundations, components, states, and handoff gaps.</p><p>The audit revealed an important distinction: we did not primarily have a component shortage. We had a decision shortage. Designers and engineers needed shared rules for when to reuse, extend, or create something new.</p><p>That shifted the goal from making a bigger library to making product decisions more repeatable.</p>",
    design_process:
      "<p>We built the system from the foundations up, while checking every layer against real product usage.</p><ol><li><strong>Foundations:</strong> standardised colour, typography, spacing, elevation, and semantic states.</li><li><strong>Theme logic:</strong> aligned light and dark modes through shared variables and tokens instead of parallel component sets.</li><li><strong>Components:</strong> used variants and properties to reduce duplicated patterns while keeping real product flexibility.</li><li><strong>Naming:</strong> created clearer conventions so designers could find components and developers could map them to code.</li><li><strong>Guidance:</strong> documented anatomy, states, accessibility, content rules, and boundaries instead of leaving usage implicit.</li><li><strong>Adoption:</strong> reviewed implementation with developers and compared Figma patterns with Storybook so the system survived handoff.</li></ol>",
    solution:
      "<p>TIQS 2.0 created a shared product language across design and engineering.</p><ul><li>Theme-aware foundations and semantic tokens.</li><li>Reusable components with structured variants and properties.</li><li>Clear interaction, disabled, error, and accessibility states.</li><li>Consistent iconography and numerical typography for financial data.</li><li>Documentation designed for teams to make decisions without needing the original component author in the room.</li><li>Closer Figma-to-Storybook mapping to reduce drift between design and code.</li></ul>",
    outcome:
      "<p>The system reduced avoidable inconsistency and made common design and implementation decisions easier to repeat across iOS and Android.</p><p>For users, that meant a more predictable product. For the team, it created a stronger base for shipping new modules without rebuilding the same interaction patterns or renegotiating the same states each time.</p><p>We did not track a publishable percentage improvement, so I am keeping the impact to the changes we could verify in the product and handoff process.</p>",
    learnings:
      "<p>The most valuable parts of a design system are often the least visual: naming, documentation, code mapping, and adoption.</p><p>A large component library can still fail if the team does not know which decision it is meant to replace.</p>",
    metrics: [
      {
        value: "iOS + Android",
        label: "Cross-platform scope",
        hint: "Reusable patterns across mobile products",
      },
      {
        value: "Light + Dark",
        label: "Shared theme logic",
        hint: "Semantic foundations instead of parallel systems",
      },
      {
        value: "Design ↔ Code",
        label: "Alignment focus",
        hint: "Naming, documentation, and Storybook review",
      },
    ],
  },
};

export function applyProjectStoryPreview<T extends { slug: string }>(project: T): T {
  const override = PROJECT_STORY_PREVIEW[project.slug];
  if (!override) return project;
  return { ...project, ...override } as T;
}
