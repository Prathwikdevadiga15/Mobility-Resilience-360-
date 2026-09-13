export const chatbotKnowledge = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'greetings'],
    examples: [
      'hi',
      'hello',
      'hey there',
      'good morning',
      'good evening'
    ],
    response:
      "Hi! I'm Mobility AI 👋 I can help you with traffic, buses, parking, routes, road issues and smart mobility. What would you like to check today?",
    quickActions: ['🚦 Check Traffic', '🚌 Bus Transit', '🅿️ Find Parking', '🗺️ Open Live Map'],
    route: '/map'
  },
  {
    id: 'mobility_360_overview',
    keywords: ['what is mobility 360', 'mobility 360', 'what is this platform', 'tell me about mobility 360'],
    examples: [
      'what is mobility 360?',
      'tell me about mobility 360',
      'what is this platform?',
      'what does mobility 360 do?'
    ],
    response:
      'Mobility 360 is an integrated smart city mobility platform that combines live traffic intelligence, bus transit information, parking insights, and public safety reporting in one unified experience for commuters and city teams.',
    quickActions: ['🧠 How it works', '🗺️ Open Live Map', '🚦 Check Traffic'],
    route: '/map'
  },
  {
    id: 'assistant_capabilities',
    keywords: ['what can you do', 'what can mobility ai do', 'what can you help with', 'your abilities'],
    examples: [
      'what can you do?',
      'what can mobility ai do?',
      'what can you help with?',
      'what are your features?'
    ],
    response:
      'I can help with traffic conditions, bus and transit guidance, parking guidance, route planning, road issue reporting, emergency support, sustainability recommendations, and general smart-city mobility advice.',
    quickActions: ['🚦 Check Traffic', '🚌 Bus Transit', '🅿️ Find Parking', '🗺️ Open Live Map'],
    route: '/map'
  },
  {
    id: 'how_platform_works',
    keywords: ['how does it work', 'how does the platform work', 'how does mobility 360 work', 'platform workflow'],
    examples: [
      'how does it work?',
      'how does the platform work?',
      'how does mobility 360 work?',
      'what is the workflow?'
    ],
    response:
      'The platform brings together live data, city monitoring, citizen reports, and AI analysis to highlight priority issues, map traffic conditions, and support faster decisions for safer and smarter urban movement.',
    quickActions: ['🧠 How it works', '📊 View Analytics', '🗺️ Open Live Map'],
    route: '/analytics'
  },
  {
    id: 'traffic_status',
    keywords: ['traffic status', 'how is traffic', 'is there traffic', 'road condition', 'traffic conditions', 'which roads are busy', 'show congestion', 'are roads crowded', 'traffic right now'],
    examples: [
      'how is traffic?',
      'is there traffic today?',
      'which roads are busy?',
      'show congestion',
      'traffic conditions right now'
    ],
    response:
      'I can help with that. Open the Live Map to check current congestion levels. Roads marked in red indicate heavy traffic, while green suggests smoother movement. You can also compare alternate routes before you travel.',
    quickActions: ['🚦 Open Traffic Map', '🗺️ Open Live Map', '🛣️ Avoid Traffic'],
    route: '/traffic'
  },
  {
    id: 'heavy_traffic_meaning',
    keywords: ['heavy traffic meaning', 'what does heavy traffic mean', 'red traffic meaning', 'traffic is heavy'],
    examples: [
      'what does heavy traffic mean?',
      'what does red traffic mean?',
      'when traffic is heavy',
      'heavy congestion meaning'
    ],
    response:
      'Heavy traffic usually means slow movement, high congestion levels, longer travel times, and increased risk of delays on major corridors. In Mobility 360, red or high-risk zones usually indicate heavy congestion.',
    quickActions: ['🚦 Check Traffic', '🗺️ Open Live Map', '🛣️ Best Route'],
    route: '/traffic'
  },
  {
    id: 'moderate_traffic_meaning',
    keywords: ['moderate traffic', 'yellow traffic meaning', 'slow traffic', 'medium traffic'],
    examples: [
      'what does moderate traffic mean?',
      'what is yellow traffic?',
      'medium traffic meaning',
      'slow traffic explanation'
    ],
    response:
      'Moderate traffic means movement is manageable but slower than usual. Delays may still happen, especially around junctions or peak hours, so it is smart to allow extra travel time or choose an alternate route.',
    quickActions: ['🛣️ Best Route', '🚦 Check Traffic', '🗺️ Open Live Map'],
    route: '/map'
  },
  {
    id: 'low_traffic_meaning',
    keywords: ['low traffic', 'smooth traffic', 'green traffic meaning', 'less traffic'],
    examples: [
      'what does low traffic mean?',
      'green traffic meaning',
      'how do I know traffic is low?',
      'traffic is smooth'
    ],
    response:
      'Low traffic generally means smoother movement, quicker travel times, and lower congestion pressure. In the map, green zones usually indicate good flow and safer commuting conditions.',
    quickActions: ['🗺️ Open Live Map', '🚦 Check Traffic', '🚌 Bus Transit'],
    route: '/map'
  },
  {
    id: 'check_live_traffic',
    keywords: ['check live traffic', 'show live traffic', 'how do i check traffic', 'live map traffic'],
    examples: [
      'how can I check live traffic?',
      'show live traffic',
      'where is the live traffic map?',
      'how do I view traffic status?'
    ],
    response:
      'Use the Live Map section to see current congestion, mobility density, and route visibility in real time. The map is the quickest way to understand current road conditions before you travel.',
    quickActions: ['🗺️ Open Live Map', '🚦 Traffic Overview', '🛣️ Best Route'],
    route: '/map'
  },
  {
    id: 'traffic_map_explanation',
    keywords: ['what is the traffic map', 'explain the traffic map', 'map explanation', 'how to read map'],
    examples: [
      'what is the traffic map?',
      'explain the traffic map',
      'how do I read the traffic map?',
      'what does the traffic map show?'
    ],
    response:
      'The traffic map visualizes city movement, hotspot areas, incidents, bus movement, and risk patterns. It helps you understand where traffic is flowing smoothly and where conditions may be slower or more disrupted.',
    quickActions: ['🗺️ Open Live Map', '🚦 View Traffic', '📊 View Analytics'],
    route: '/map'
  },
  {
    id: 'bus_information',
    keywords: ['bus information', 'tell me about buses', 'bus details', 'bus availability'],
    examples: [
      'tell me about buses',
      'what bus information do you have?',
      'show bus details',
      'bus information'
    ],
    response:
      'You can check live bus stops, routes, timings, and connectivity from the Bus Transit section. It helps you plan trips more efficiently and avoid unnecessary waiting.',
    quickActions: ['🚌 View Bus Transit', '🗺️ Open Live Map', '📍 Bus Stops'],
    route: '/bus'
  },
  {
    id: 'find_bus',
    keywords: ['find a bus', 'which bus goes there', 'show buses', 'bus route near me', 'looking for a bus'],
    examples: [
      'where is my bus?',
      'find a bus to the city center',
      'show buses',
      'which bus goes to mangaluru city?'
    ],
    response:
      'Open Bus Transit to explore routes, stops, and live service information. I can help you narrow it down by origin, destination, and likely travel time.',
    quickActions: ['🚌 Find Bus', '📍 Bus Stops', '🗺️ Open Live Map'],
    route: '/bus'
  },
  {
    id: 'bus_timings',
    keywords: ['bus timings', 'what are the bus timings', 'when is the next bus', 'bus schedule'],
    examples: [
      'what are the bus timings?',
      'when is the next bus?',
      'show bus schedule',
      'bus timetable'
    ],
    response:
      'Bus timing details are available in the Bus Transit dashboard. You can compare routes and identify the best option based on the stop, frequency, and travel direction.',
    quickActions: ['🚌 Bus Schedule', '📍 Bus Stops', '🗺️ Live Route Map'],
    route: '/bus'
  },
  {
    id: 'bus_routes',
    keywords: ['bus routes', 'route information', 'show bus routes', 'which bus route'],
    examples: [
      'what are the bus routes?',
      'show me bus routes',
      'which route should I take?',
      'bus route options'
    ],
    response:
      'Mobility 360 helps you compare route options, determine likely stop connections, and choose the most efficient path for your commute. The route view is designed to reduce uncertainty and waiting time.',
    quickActions: ['🚌 View Routes', '📍 Bus Stops', '🗺️ Open Map'],
    route: '/bus'
  },
  {
    id: 'bus_stop_info',
    keywords: ['bus stop information', 'nearest bus stop', 'where is the bus stop', 'bus stop location'],
    examples: [
      'where is the nearest bus stop?',
      'show bus stop info',
      'bus stop location',
      'bus stop details'
    ],
    response:
      'You can identify nearby stops and route coverage from the transit layer. This helps you understand access, travel distance, and which buses serve your area.',
    quickActions: ['📍 Nearby Stops', '🚌 Bus Transit', '🗺️ Live Map'],
    route: '/bus'
  },
  {
    id: 'public_transport_recommendation',
    keywords: ['public transport recommendation', 'which transport is best', 'recommend bus', 'best public transport'],
    examples: [
      'which public transport should I use?',
      'recommend a bus route',
      'best transport option',
      'what is the best public transport?'
    ],
    response:
      'If your goal is to reduce congestion and travel time, public transit is often the best option. I recommend checking the bus route planner and comparing the available stop coverage before you start your journey.',
    quickActions: ['🚌 Bus Transit', '🚦 Check Traffic', '🗺️ Open Live Map'],
    route: '/bus'
  },
  {
    id: 'parking_availability',
    keywords: ['parking availability', 'is there parking', 'parking near me', 'where can i park', 'free parking'],
    examples: [
      'is there parking nearby?',
      'where can I park?',
      'parking near me',
      'show parking availability'
    ],
    response:
      'Use the Smart Parking section to explore available parking locations and compare options based on access, demand, and convenience. If live availability is not available, I can still guide you to the relevant parking tools in the app.',
    quickActions: ['🅿️ Find Parking', '🗺️ Open Live Map', '🚗 Parking Route'],
    route: '/parking'
  },
  {
    id: 'find_parking',
    keywords: ['find parking', 'need parking', 'parking place', 'show parking', 'find a parking spot'],
    examples: [
      'I need parking',
      'find parking',
      'show parking spots',
      'where can I find a parking place?'
    ],
    response:
      'The Smart Parking section is built for exactly that. It helps you discover suitable parking areas and highlights the most practical places to stop based on city demand and location.',
    quickActions: ['🅿️ Find Parking', '🚗 Parking Route', '🗺️ Open Live Map'],
    route: '/parking'
  },
  {
    id: 'smart_parking_explanation',
    keywords: ['smart parking explanation', 'what is smart parking', 'how does parking work', 'parking system'],
    examples: [
      'what is smart parking?',
      'how does the parking system work?',
      'explain parking intelligence',
      'smart parking overview'
    ],
    response:
      'Smart parking helps reduce time spent driving around for a slot, improves roadside organization, and supports better city flow. It connects parking intelligence to map-based decision making for a smoother commute.',
    quickActions: ['🅿️ Find Parking', '🗺️ Open Live Map', '🚗 Parking Route'],
    route: '/parking'
  },
  {
    id: 'parking_route',
    keywords: ['parking route', 'route to parking', 'navigate to parking', 'how do i get to parking'],
    examples: [
      'how do I get to the parking area?',
      'route to parking',
      'navigate to parking',
      'parking location route'
    ],
    response:
      'You can check the parking layer and then use the route view to choose the most practical destination. In general, choose the nearest safer, less congested option to save time and reduce vehicle circling.',
    quickActions: ['🅿️ Find Parking', '🗺️ Open Map', '🚗 Parking Advice'],
    route: '/parking'
  },
  {
    id: 'road_issue_reporting',
    keywords: ['report road issue', 'road issue', 'report problem', 'issue reporting'],
    examples: [
      'how do I report a road issue?',
      'report road problem',
      'road issue reporting',
      'how can I notify about a bad road?'
    ],
    response:
      'Use the Report section to submit a road issue with a photo or description. The platform then classifies the problem and helps prioritize the most urgent concerns for city action.',
    quickActions: ['🛠️ Report Issue', '🕳️ Pothole Report', '🚨 Emergency'],
    route: '/report'
  },
  {
    id: 'report_pothole',
    keywords: ['pothole', 'report pothole', 'damaged road', 'bad road'],
    examples: [
      'report a pothole',
      'pothole near me',
      'damaged road',
      'road has a pothole'
    ],
    response:
      'A pothole report can be submitted through the reporting flow, including a photo and location. That helps city teams identify dangerous road conditions and prioritize repair work faster.',
    quickActions: ['🕳️ Report Pothole', '🛠️ Road Issue', '🗺️ Open Map'],
    route: '/report'
  },
  {
    id: 'report_damaged_road',
    keywords: ['damaged road', 'bad road surface', 'crack in road', 'road damage'],
    examples: [
      'the road is damaged',
      'report damaged road',
      'road surface is broken',
      'there is a broken road'
    ],
    response:
      'This type of issue belongs in the road issue report category. Include the location and a short description so it can be classified and prioritized correctly by the system.',
    quickActions: ['🛠️ Report Road Issue', '🗺️ Open Live Map', '🚨 Emergency'],
    route: '/report'
  },
  {
    id: 'report_traffic_signal_problem',
    keywords: ['traffic signal problem', 'broken signal', 'faulty traffic light', 'signal issue'],
    examples: [
      'traffic signal is not working',
      'report a broken traffic signal',
      'faulty traffic light',
      'signal issue near me'
    ],
    response:
      'Traffic signal and intersection problems should be reported through the road issue flow. The system can help classify the problem and flag it as higher priority when it affects safety.',
    quickActions: ['🚦 Traffic Issue', '🛠️ Report Issue', '🧭 Best Route'],
    route: '/report'
  },
  {
    id: 'report_accident',
    keywords: ['report accident', 'accident on road', 'road accident', 'vehicle collision'],
    examples: [
      'there was an accident',
      'report an accident',
      'road accident near here',
      'collision on the road'
    ],
    response:
      'An accident report should be submitted immediately through the issue flow, especially if it is blocking movement or creating a safety risk. If it is an active emergency, emergency services should be contacted right away.',
    quickActions: ['🚨 Emergency', '🗺️ Open Live Map', '🛠️ Report Issue'],
    route: '/emergency'
  },
  {
    id: 'emergency_assistance',
    keywords: ['emergency help', 'need emergency assistance', 'urgent help', 'call for help'],
    examples: [
      'I need emergency assistance',
      'urgent help needed',
      'emergency help',
      'there is an emergency' 
    ],
    response:
      'For immediate danger, contact the appropriate emergency services first. The Emergency section in Mobility 360 is designed to help you quickly identify critical risk points and route to urgent assistance.',
    quickActions: ['🚨 Emergency', '🗺️ Open Live Map', '🛠️ Report Issue'],
    route: '/emergency'
  },
  {
    id: 'emergency_route',
    keywords: ['emergency route', 'route to hospital', 'fastest emergency route', 'nearest emergency route'],
    examples: [
      'what is the fastest route to the hospital?',
      'show emergency route',
      'route to emergency center',
      'best route to hospital'
    ],
    response:
      'In an emergency, prioritize the shortest and safest route, avoid congested areas if possible, and use the emergency guidance tools in the platform where available. I can also help you understand which route is likely to be faster.',
    quickActions: ['🚨 Emergency', '🗺️ Open Map', '🧭 Best Route'],
    route: '/emergency'
  },
  {
    id: 'nearest_emergency_facility',
    keywords: ['nearest emergency facility', 'where is the nearest hospital', 'nearest clinic', 'medical help nearby'],
    examples: [
      'where is the nearest emergency facility?',
      'nearest hospital',
      'where can I get emergency help?',
      'nearest clinic'
    ],
    response:
      'You can use the emergency and live map layers to assess the nearest support points and major response locations. If you need immediate medical attention, follow local emergency procedures and seek the nearest official service.',
    quickActions: ['🚨 Emergency', '🗺️ Open Live Map', '🧭 Best Route'],
    route: '/emergency'
  },
  {
    id: 'road_blockage',
    keywords: ['road blocked', 'road blockage', 'traffic road closed', 'road is blocked'],
    examples: [
      'the road is blocked',
      'road blockage',
      'traffic road closed',
      'there is a road closure'
    ],
    response:
      'A blockage or closure should be treated as a high-priority road issue. Use the map and reporting tools to highlight the location and consider an alternate route until the obstruction is cleared.',
    quickActions: ['🛠️ Report Issue', '🗺️ Open Live Map', '🧭 Best Route'],
    route: '/map'
  },
  {
    id: 'route_planning',
    keywords: ['route planning', 'plan my route', 'how do i navigate', 'route guidance'],
    examples: [
      'help me plan a route',
      'route planning',
      'how do I choose the best route?',
      'navigate me'
    ],
    response:
      'Use the city map and traffic layers to compare route options, then select the route with the smoothest flow and fewer risk points. It is usually best to avoid corridors with repeated congestion or road issues.',
    quickActions: ['🧭 Best Route', '🗺️ Open Live Map', '🚦 Check Traffic'],
    route: '/map'
  },
  {
    id: 'best_route',
    keywords: ['best route', 'fastest route', 'shortest route', 'efficient route'],
    examples: [
      'what is the best route?',
      'show me the fastest route',
      'which route is shortest?',
      'choose the efficient route'
    ],
    response:
      'The best route is usually the one with the least congestion, fewer road issues, and better movement consistency. I recommend checking the live route and traffic map before departure.',
    quickActions: ['🧭 Best Route', '🚦 Check Traffic', '🗺️ Open Live Map'],
    route: '/map'
  },
  {
    id: 'alternative_route',
    keywords: ['alternative route', 'other route', 'different route', 'avoid traffic route'],
    examples: [
      'show an alternative route',
      'other route option',
      'different route to avoid traffic',
      'find a bypass route'
    ],
    response:
      'Alternate routes are useful when main corridors are congested or blocked. Compare the map layers for traffic density, road incidents, and travel time before you decide which route to take.',
    quickActions: ['🧭 Best Route', '🗺️ Open Live Map', '🚦 Traffic'],
    route: '/map'
  },
  {
    id: 'avoid_heavy_traffic',
    keywords: ['avoid traffic', 'avoid heavy traffic', 'how can i avoid traffic', 'stay away from congestion'],
    examples: [
      'how can I avoid traffic?',
      'avoid heavy traffic',
      'which route avoids congestion?',
      'how do I bypass traffic?'
    ],
    response:
      'I can help with that. Open the Live Map to check current congestion levels. Roads marked in red indicate heavier traffic, while green indicates smoother movement. You can also compare alternate routes before starting your journey.',
    quickActions: ['🛣️ Avoid Traffic', '🧭 Best Route', '🗺️ Open Live Map'],
    route: '/map'
  },
  {
    id: 'travel_time',
    keywords: ['travel time', 'how long will it take', 'trip duration', 'journey time'],
    examples: [
      'how long will the trip take?',
      'travel time estimate',
      'what is the journey duration?',
      'how long to reach there?'
    ],
    response:
      'Travel time depends on route choice, congestion, bus schedules, and any active road issues. Check the live traffic layer or route planner to estimate the smoothest and quickest way to travel.',
    quickActions: ['🧭 Best Route', '🚦 Check Traffic', '🚌 Bus Transit'],
    route: '/traffic'
  },
  {
    id: 'navigation_help',
    keywords: ['navigation help', 'need navigation', 'help with directions', 'route guidance'],
    examples: [
      'I need navigation help',
      'show me directions',
      'help with directions',
      'how do I navigate?'
    ],
    response:
      'You can use the map to compare routes, identify risk hotspots, and choose a smoother path. If you are traveling by bus or private vehicle, checking route conditions before departure is the strongest step to reduce delays.',
    quickActions: ['🗺️ Open Live Map', '🧭 Best Route', '🚌 Bus Transit'],
    route: '/map'
  },
  {
    id: 'city_map_explanation',
    keywords: ['city map explanation', 'what is the city map', 'map overview', 'how is the map organized'],
    examples: [
      'what is the city map?',
      'explain the city map',
      'how is the mobility map organized?',
      'what does the city map show?',
      'show me the map'
    ],
    response:
      'The city map brings together mobility layers such as traffic density, transit points, risk areas, parking, and active reports so you can understand the city as a connected system rather than isolated locations.',
    quickActions: ['🗺️ Open Live Map', '📊 View Analytics', '🚦 Check Traffic'],
    route: '/map'
  },
  {
    id: 'map_legend_explanation',
    keywords: ['map legend', 'what do the colors mean', 'legend explanation', 'map symbols meaning'],
    examples: [
      'what does the map legend mean?',
      'explain the map legend',
      'what do the colors on the map mean?',
      'what are the map symbols?'
    ],
    response:
      'The map legend helps decode the meaning of each layer and marker. Green usually indicates smooth flow, yellow suggests moderate conditions, red indicates higher risk or congestion, blue is often transit-related, and purple may be tied to special priority or emergency-sensitive areas.',
    quickActions: ['🗺️ Open Live Map', '🚦 View Traffic', '🚌 Bus Transit'],
    route: '/map'
  },
  {
    id: 'green_marker_meaning',
    keywords: ['green marker meaning', 'green icon meaning', 'what does green mean', 'green area meaning'],
    examples: [
      'what does the green marker mean?',
      'what does green mean on the map?',
      'what is the green marker for?',
      'green symbol explanation'
    ],
    response:
      'Green markers usually indicate smoother travel conditions, normal flow, or a lower-risk area. In the map context, green often represents movement that is more efficient and less congested.',
    quickActions: ['🗺️ Open Live Map', '🚦 Check Traffic', '✅ Mobility Score'],
    route: '/map'
  },
  {
    id: 'yellow_marker_meaning',
    keywords: ['yellow marker meaning', 'yellow icon meaning', 'what does yellow mean', 'yellow area meaning'],
    examples: [
      'what does the yellow marker mean?',
      'what does yellow mean on the map?',
      'yellow symbol meaning',
      'what is the yellow zone?'
    ],
    response:
      'Yellow usually suggests moderate conditions. There may be some slowing, moderate congestion, or caution needed in that area. It often signals a situation that is manageable but worth watching.',
    quickActions: ['🗺️ Open Live Map', '🚦 View Traffic', '🛣️ Avoid Traffic'],
    route: '/map'
  },
  {
    id: 'red_marker_meaning',
    keywords: ['red marker meaning', 'red icon meaning', 'what does red mean', 'red area meaning'],
    examples: [
      'what does the red marker mean?',
      'what does red mean on the map?',
      'red symbol meaning',
      'what is the red zone?'
    ],
    response:
      'Red typically represents higher traffic density, greater congestion, or a more critical issue area. It is a signal to avoid that route if possible or plan an alternate path.',
    quickActions: ['🗺️ Open Live Map', '🛣️ Avoid Traffic', '🧭 Best Route'],
    route: '/map'
  },
  {
    id: 'blue_marker_meaning',
    keywords: ['blue marker meaning', 'blue icon meaning', 'what does blue mean', 'blue area meaning'],
    examples: [
      'what does the blue marker mean?',
      'what does blue mean on the map?',
      'blue symbol explanation',
      'what is the blue location?'
    ],
    response:
      'Blue is commonly associated with transit-related information such as bus stops, routes, or other service infrastructure. It typically highlights mobility connections and public transportation access.',
    quickActions: ['🚌 Bus Transit', '📍 Bus Stops', '🗺️ Open Live Map'],
    route: '/bus'
  },
  {
    id: 'purple_marker_meaning',
    keywords: ['purple marker meaning', 'purple icon meaning', 'what does purple mean', 'purple area meaning'],
    examples: [
      'what does the purple marker mean?',
      'purple symbol on the map',
      'what does purple indicate?',
      'purple zone explanation'
    ],
    response:
      'Purple often points to higher-priority or sensitive mobility conditions, such as emergency-focused areas, critical routes, or special operational points that need attention. It is designed to stand out for faster awareness.',
    quickActions: ['🚨 Emergency', '🗺️ Open Map', '📊 View Analytics'],
    route: '/emergency'
  },
  {
    id: 'sustainable_transportation',
    keywords: ['sustainable transportation', 'eco transport', 'reduce pollution', 'green travel', 'public transport benefits'],
    examples: [
      'what is sustainable transportation?',
      'how can I reduce pollution?',
      'what are eco-friendly commuting options?',
      'how does public transport help the environment?'
    ],
    response:
      'Sustainable transportation focuses on reducing emissions, congestion, and fuel waste by encouraging cleaner and smarter commuting options. Public transit, shared movement, and informed route planning all support a greener city future.',
    quickActions: ['🚌 Bus Transit', '🌿 Sustainability', '📊 Analytics'],
    route: '/analytics'
  },
  {
    id: 'reduce_traffic_congestion',
    keywords: ['reduce traffic congestion', 'how to reduce traffic', 'less congestion', 'ease traffic'],
    examples: [
      'how can we reduce traffic congestion?',
      'what reduces traffic?',
      'how to reduce road congestion?',
      'tips to reduce traffic load'
    ],
    response:
      'Reducing congestion usually starts with better route planning, transit usage, real-time visibility, and proactive reporting of road issues. When people shift to smarter travel decisions, the city experiences smoother movement overall.',
    quickActions: ['🚦 Traffic', '🚌 Bus Transit', '🗺️ Open Map'],
    route: '/traffic'
  },
  {
    id: 'reduce_pollution',
    keywords: ['reduce pollution', 'lower pollution', 'less air pollution', 'eco friendly commute'],
    examples: [
      'how can I reduce pollution?',
      'what lowers air pollution?',
      'how do we reduce urban pollution?',
      'how can commuting be greener?'
    ],
    response:
      'Choosing public transport, avoiding unnecessary peak-hour driving, and using smarter route planning can significantly lower emissions. Mobility 360 supports those decisions through cleaner, more informed commuting behavior.',
    quickActions: ['🌿 Sustainability', '🚌 Bus Transit', '📊 Analytics'],
    route: '/analytics'
  },
  {
    id: 'smart_city_explanation',
    keywords: ['smart city', 'what is a smart city', 'smart city mobility', 'smart city platform'],
    examples: [
      'what is a smart city?',
      'how does a smart city work?',
      'what is smart city mobility?',
      'explain smart city platform'
    ],
    response:
      'A smart city uses connected data, responsive infrastructure, and digital tools to improve mobility, safety, services, and decision-making. Mobility 360 is one such approach for intelligent and more livable urban movement.',
    quickActions: ['🧠 How it works', '📊 Analytics', '🗺️ Open Live Map'],
    route: '/analytics'
  },
  {
    id: 'ai_usage',
    keywords: ['how is ai used', 'how does ai help', 'ai in mobility 360', 'artificial intelligence'],
    examples: [
      'how does AI help?',
      'how is AI used in Mobility 360?',
      'what role does AI play?',
      'show AI use in the platform'
    ],
    response:
      'AI helps classify road issues, prioritize urgent reports, detect patterns in traffic and risk, and support smarter decisions across the city. It turns raw mobility data into clearer opportunities for action and planning.',
    quickActions: ['🧠 How it works', '📊 Analytics', '🚦 Check Traffic'],
    route: '/analytics'
  },
  {
    id: 'data_privacy',
    keywords: ['data privacy', 'is my data safe', 'privacy', 'how is data handled', 'personal info'],
    examples: [
      'is my data safe?',
      'how is data handled?',
      'what about privacy?',
      'does the platform store personal data?'
    ],
    response:
      'Mobility 360 is designed with privacy-aware handling of user information. The current experience uses session-level interaction and does not require permanent storage of sensitive personal data for the chatbot flow.',
    quickActions: ['🧠 How it works', '📖 About', '🚀 Platform Overview'],
    route: '/about'
  },
  {
    id: 'website_usage',
    keywords: ['how to use the website', 'how do i use this website', 'website guide', 'how to navigate'],
    examples: [
      'how do I use this website?',
      'what can I do on the site?',
      'website guide',
      'how do I navigate the platform?'
    ],
    response:
      'You can explore the map, traffic pages, bus data, parking information, and reporting tools through the main navigation. The chatbot is also available at any time to guide you to the most relevant section.',
    quickActions: ['🗺️ Open Live Map', '🚌 Bus Transit', '🅿️ Find Parking'],
    route: '/map'
  },
  {
    id: 'contact_help_about',
    keywords: ['contact', 'help', 'about the project', 'who made this'],
    examples: [
      'who built this project?',
      'contact help',
      'how can I get help?',
      'about the project'
    ],
    response:
      'Mobility 360 is a smart-city mobility platform focused on smarter transport, safer roads, and better urban operations. You can explore the main sections of the app to understand the platform, technology, and city impact.',
    quickActions: ['📖 About', '🧠 How it works', '🗺️ Open Live Map'],
    route: '/analytics'
  },
  {
    id: 'general_help',
    keywords: ['help', 'support', 'need help', 'i need guidance'],
    examples: [
      'I need help',
      'can you guide me?',
      'need support',
      'help me with mobility'
    ],
    response:
      'I can help with traffic, buses, parking, road issues, routes, emergency guidance, and broader smart-city mobility questions. Tell me what you need and I will guide you to the relevant section.',
    quickActions: ['🚦 Check Traffic', '🚌 Bus Transit', '🅿️ Find Parking', '🗺️ Open Live Map'],
    route: '/map'
  },
  {
    id: 'fallback',
    keywords: ['fallback'],
    examples: ['random unsupported question'],
    response:
      "I'm not fully sure what you're looking for yet. I can help with traffic, buses, parking, routes, road issues and smart-city mobility.",
    quickActions: ['🚦 Traffic', '🚌 Bus', '🅿️ Parking', '🗺️ Map'],
    route: '/map'
  }
];

const intentMap = Object.fromEntries(chatbotKnowledge.map((intent) => [intent.id, intent]));

export const defaultQuickActions = ['🚦 Check Traffic', '🚌 Bus Transit', '🅿️ Find Parking', '🗺️ Open Live Map'];

export function normalizeChatInput(value = '') {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function containsWholePhrase(text, phrase) {
  if (!text || !phrase) return false;
  if (text === phrase) return true;

  const textWords = text.split(' ');
  const phraseWords = phrase.split(' ');

  if (phraseWords.length > textWords.length) return false;

  for (let i = 0; i <= textWords.length - phraseWords.length; i += 1) {
    const match = phraseWords.every((word, index) => textWords[i + index] === word);
    if (match) return true;
  }

  return false;
}

export function findChatbotIntent(input, previousIntentId = null) {
  const normalized = normalizeChatInput(input || '');

  if (!normalized) {
    return intentMap.greeting;
  }

  const contextualMatches = ['closest', 'that', 'this one', 'which one', 'more info', 'show me more', 'what about'];
  if (previousIntentId && contextualMatches.some((phrase) => containsWholePhrase(normalized, normalizeChatInput(phrase)))) {
    const previousIntent = intentMap[previousIntentId];
    if (previousIntent && previousIntent.id !== 'fallback') {
      return previousIntent;
    }
  }

  let bestMatch = intentMap.fallback;
  let bestScore = 0;

  for (const intent of chatbotKnowledge) {
    const fullText = [intent.id, ...intent.examples, ...intent.keywords].join(' ');
    let score = 0;

    for (const keyword of intent.keywords) {
      if (!keyword) continue;
      const normalizedKeyword = normalizeChatInput(keyword);
      if (containsWholePhrase(normalized, normalizedKeyword) || containsWholePhrase(normalizedKeyword, normalized)) {
        score += 8;
      }
    }

    for (const example of intent.examples) {
      if (!example) continue;
      const exampleNorm = normalizeChatInput(example);
      if (containsWholePhrase(normalized, exampleNorm) || containsWholePhrase(exampleNorm, normalized)) {
        score += 10;
      }
    }

    const idWords = intent.id.split('_');
    for (const word of idWords) {
      if (word && containsWholePhrase(normalized, word)) {
        score += 2;
      }
    }

    if (containsWholePhrase(normalized, 'traffic') && intent.id.includes('traffic')) {
      score += 2;
    }

    if (containsWholePhrase(normalized, 'parking') && intent.id.includes('parking')) {
      score += 2;
    }

    if (containsWholePhrase(normalized, 'bus') && intent.id.includes('bus')) {
      score += 2;
    }

    if (containsWholePhrase(normalized, 'map') && intent.id.includes('map')) {
      score += 2;
    }

    if (containsWholePhrase(normalized, 'road') && intent.id.includes('road')) {
      score += 2;
    }

    if (containsWholePhrase(normalized, 'report') && intent.id.includes('report')) {
      score += 2;
    }

    if (containsWholePhrase(normalized, 'emergency') && intent.id.includes('emergency')) {
      score += 2;
    }

    if (containsWholePhrase(fullText.toLowerCase(), normalized)) {
      score += 1;
    }

    if (score > bestScore) {
      bestMatch = intent;
      bestScore = score;
    }
  }

  if (bestScore >= 6) {
    return bestMatch;
  }

  return intentMap.fallback;
}
