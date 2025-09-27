export const masterAchievements = [
    { id: 'Fire Safety Pro', name: 'Fire Safety Pro', description: 'Score 50+ points overall.' },
    { id: 'Earthquake Expert', name: 'Earthquake Expert', description: 'Score 100+ points overall.' },
    { id: 'All-Rounder', name: 'All-Rounder', description: 'Score 150+ points overall.' },
    { id: 'Safety Superstar', name: 'Safety Superstar', description: 'Score 300+ points overall.' },
    { id: 'Quiz Novice', name: 'Quiz Novice', description: 'Complete any quiz.' },
    { id: 'Fire Quiz Master', name: 'Fire Quiz Master', description: 'Master the Fire Safety quiz.' },
    { id: 'Earthquake Quiz Master', name: 'Earthquake Quiz Master', description: 'Master the Earthquake quiz.' },
    { id: 'Tornado Quiz Master', name: 'Tornado Quiz Master', description: 'Master the Tornado quiz.' },
    { id: 'Flood Quiz Master', name: 'Flood Quiz Master', description: 'Master the Flood Safety quiz.' },
    { id: 'Wildfire Quiz Master', name: 'Wildfire Quiz Master', description: 'Master the Wildfire quiz.' },
    { id: 'Hurricane Quiz Master', name: 'Hurricane Quiz Master', description: 'Master the Hurricane quiz.' },
    { id: 'Response Protocol Master', name: 'Response Protocol Master', description: 'Master the Response Protocol quiz.' },
    { id: 'Level 5 Reached', name: 'Good job!', description: 'Bravo' },
    { id: 'Pro', name: 'Pro', description: 'Pro level brainy!' },
    { id: 'Perfect Score', name: 'Perfect Score', description: 'Get a perfect score on any quiz.' },
    { id: 'Triple Threat', name: 'Triple Threat', description: 'Complete 3 different quizzes.' },
    { id: 'Penta-Perfect', name: 'Penta-Perfect', description: 'Complete 5 different quizzes.' },
    { id: 'Safety Savant', name: 'Safety Savant', description: 'Complete all available quizzes.' },
];

export const localDB = {
    score: 0,
    achievements: [],
    completedQuizzes: [],
    lastActive: '2023-10-27T12:00:00Z'
};

export const quizBank = {
    fire: [
        { q: "If you see smoke in a hallway, what's the safest action?", a: ["Run through it quickly", "Find an alternate route", "Wait for instructions", "Open a window for ventilation"], correct: 1 },
        { q: "What does 'Stop, Drop, and Roll' help with?", a: ["Finding an exit", "Signaling for help", "Extinguishing fire on your clothes", "Protecting you from smoke"], correct: 2 },
        { q: "Before opening a closed door during a fire, you must:", a: ["Yell for help", "Feel the door and doorknob for heat", "Break it down immediately", "Look for the key"], correct: 1 },
        { q: "Where is the designated meeting point after evacuating?", a: ["Anywhere far from the building", "The school parking lot", "A pre-determined location away from the building", "Back in the classroom once the alarm stops"], correct: 2 },
        { q: "What is the main reason to stay low to the ground in a fire?", a: ["To move faster", "To avoid tripping", "Cleaner, cooler air is near the floor", "To see better"], correct: 2 },
        { q: "If the fire alarm sounds, you should:", a: ["Finish your work quickly", "Call 911 immediately", "Evacuate calmly and immediately", "Wait for a teacher's instruction"], correct: 2 },
        { q: "Which of these should you NOT use during a fire evacuation?", a: ["Stairs", "Hallways", "Elevators", "Emergency exits"], correct: 2 },
        { q: "What is a common cause of fires in schools?", a: ["Overloaded electrical outlets", "Rain", "Open windows", "Loud music"], correct: 0 },
        { q: "A 'Class C' fire extinguisher is used for what type of fire?", a: ["Wood and paper", "Flammable liquids", "Electrical equipment", "Cooking oils"], correct: 2 },
        { q: "What does the 'P.A.S.S.' acronym for using a fire extinguisher stand for?", a: ["Pass, Aim, Squeeze, Sweep", "Pull, Aim, Squeeze, Sweep", "Push, Alert, Shout, Spray", "Pull, Alert, Squeeze, Spray"], correct: 1 },
        { q: "If you are trapped in a room during a fire, what should you do?", a: ["Open the window and yell", "Seal cracks around the door with cloth and call 911", "Hide under the bed", "Try to break the window"], correct: 1 },
        { q: "How often should fire drills be practiced in a school?", a: ["Once a year", "Only when there is a fire", "Regularly, according to school policy", "Never"], correct: 2 },
        { q: "If your primary exit is blocked by smoke, what should you do?", a: ["Try to run through it", "Use your secondary exit", "Break a window", "Wait for help"], correct: 1 },
        { q: "Why is it dangerous to re-enter a burning building, even if you forgot something?", a: ["You might get a detention", "The fire could reignite or the structure could collapse", "The alarm is loud", "You might get dirty"], correct: 1 },
    ],
    earthquake: [
        { q: "What is the primary action during an earthquake?", a: ["Run outside immediately", "Stand in a doorway", "Drop, Cover, and Hold On", "Go to the basement"], correct: 2 },
        { q: "After an earthquake, what is a major hazard to be aware of?", a: ["Heavy rain", "Aftershocks", "Loud noises", "Bright lights"], correct: 1 },
        { q: "If you are outdoors when an earthquake starts, where should you go?", a: ["Inside the nearest building", "To an open area away from buildings and power lines", "Under a large tree", "Into your car"], correct: 1 },
        { q: "If you are in a car during an earthquake, you should:", a: ["Drive as fast as possible to get away", "Stop in a safe place, stay in the car", "Get out and run", "Honk the horn repeatedly"], correct: 1 },
        { q: "What does 'Cover' mean in 'Drop, Cover, and Hold On'?", a: ["Cover your eyes", "Get under a sturdy piece of furniture", "Cover yourself with a blanket", "Cover your mouth"], correct: 1 },
        { q: "Why should you avoid doorways during an earthquake?", a: ["They are the first to collapse", "They can swing violently and cause injury", "They are not safer than being under a table", "All of the above"], correct: 3 },
        { q: "After the shaking stops, what is the first thing you should check for?", a: ["Your phone", "Your belongings", "Injuries to yourself and others", "The time"], correct: 2 },
        { q: "What should be in a basic earthquake emergency kit?", a: ["Video games", "Water, non-perishable food, and a first-aid kit", "School books", "Expensive jewelry"], correct: 1 },
        { q: "If you are near the coast, what additional danger should you be aware of after an earthquake?", a: ["Tornadoes", "Tsunamis", "Wildfires", "Blizzards"], correct: 1 },
        { q: "True or False: Small earthquakes mean a big one is coming.", a: ["True", "False"], correct: 1 },
        { q: "If you are in bed when an earthquake starts, what should you do?", a: ["Run to the doorway", "Get out of bed and get under it", "Stay in bed, cover your head with a pillow", "Roll onto the floor"], correct: 2 },
        { q: "True or False: It is safe to use matches or lighters right after an earthquake.", a: ["True", "False, there could be gas leaks"], correct: 1 },
    ],
    tornado: [
        { q: "What is the safest location during a tornado?", a: ["In a car", "Near a large window", "A basement or an interior room on the lowest floor", "Under a highway overpass"], correct: 2 },
        { q: "Which of these is a sign of a possible tornado?", a: ["A dark, often greenish sky and a large, rotating cloud", "A light drizzle", "A perfectly clear sky", "A gentle breeze"], correct: 0 },
        { q: "If you are in a car and cannot get to a sturdy shelter, what should you do?", a: ["Try to outrun the tornado", "Stay in the car", "Get out and lie in a ditch or low-lying area", "Climb a tree"], correct: 2 },
        { q: "What should you do to protect yourself in a tornado shelter?", a: ["Stand up and watch the tornado", "Cover your head and neck with your arms", "Open all the windows", "Talk on the phone"], correct: 1 },
        { q: "A 'Tornado Watch' means:", a: ["A tornado has been spotted", "Tornadoes are possible in your area", "The tornado is over", "It's safe to go outside"], correct: 1 },
        { q: "A 'Tornado Warning' means:", a: ["A tornado has been spotted or indicated by weather radar", "Tornadoes might happen later", "The weather is just windy", "You should watch the sky"], correct: 0 },
        { q: "What should you avoid during a tornado?", a: ["Basements", "Windows, doors, and outside walls", "Small interior rooms", "Sturdy furniture"], correct: 1 },
        { q: "After a tornado passes, what is a potential hazard?", a: ["Calm weather", "Downed power lines and broken glass", "A rainbow", "A sudden drop in temperature"], correct: 1 },
        { q: "What is the 'Tornado Alley'?", a: ["A movie", "A region in the U.S. where tornadoes are most frequent", "A type of bowling alley", "A video game"], correct: 1 },
        { q: "Why is an overpass not a safe place to shelter?", a: ["It's too high", "The wind can be funneled and accelerated under it", "It might collapse", "Both B and C"], correct: 3 },
        { q: "What is the difference between a funnel cloud and a tornado?", a: ["A funnel cloud is wider", "A funnel cloud does not touch the ground", "A funnel cloud is less dangerous", "There is no difference"], correct: 1 },
        { q: "If you live in a mobile home during a tornado warning, what should you do?", a: ["Go to the strongest part of the home", "Lie down on the floor", "Evacuate immediately to a sturdy building or shelter", "Stay inside and hope for the best"], correct: 2 },
    ],
    'active-shooter': [
        { q: "What are the three actions recommended by 'Run, Hide, Fight'?", a: ["Evacuate, Barricade, Confront", "Escape, Shelter, Defend", "Run, Hide, Fight", "Alert, Lockdown, Attack"], correct: 2 },
        { q: "When you 'Hide', what is the most important action?", a: ["Lock and/or barricade the door and remain silent", "Post on social media for help", "Call your parents", "Look out the window"], correct: 0 },
        { q: "When should you choose to 'Fight' an active shooter?", a: ["As a first option", "Only as a last resort when your life is in imminent danger", "Never", "If you have a weapon"], correct: 1 },
        { q: "If you evacuate ('Run'), what should you do?", a: ["Leave your belongings behind and keep your hands visible", "Grab your backpack first", "Run in a predictable straight line", "Stop to help others who are injured"], correct: 0 },
        { q: "When law enforcement arrives, you should:", a: ["Run towards them screaming", "Follow their instructions and keep your hands visible", "Ask them for directions", "Try to hug them"], correct: 1 },
        { q: "What is the goal of 'Hiding'?", a: ["To prepare for a fight", "To be completely out of the shooter's view", "To watch the shooter", "To make a phone call"], correct: 1 },
        { q: "Why should you silence your cell phone when hiding?", a: ["To save battery", "To avoid revealing your location", "To prevent network jams", "To listen for instructions"], correct: 1 },
        { q: "If you are in a hallway, what is your best option?", a: ["Lie down and pretend to be injured", "Try to get into a lockable room", "Run towards the shooter", "Pull the fire alarm"], correct: 1 },
        { q: "What information should you provide to a 911 operator?", a: ["Location of the shooter, number of shooters, and your location", "Your name and age", "What the shooter is wearing", "All of the above"], correct: 3 },
        { q: "True or False: You should pull the fire alarm during an active shooter event.", a: ["True", "False, it can create confusion"], correct: 1 },
        { q: "When 'Fighting' an active shooter, what can be used as an improvised weapon?", a: ["A fire extinguisher", "A chair", "A heavy book", "All of the above"], correct: 3 },
        { q: "True or False: When hiding, you should pretend to be unconscious.", a: ["True", "False, this is not a reliable strategy"], correct: 1 },
    ],
    flood: [
        { q: "What does 'Turn Around, Don't Drown' mean?", a: ["Turn your back to the water", "Never enter floodwaters", "Swim in the opposite direction", "Wait for the water to go down"], correct: 1 },
        { q: "How much moving water can knock over an adult?", a: ["6 inches", "1 foot", "2 feet", "3 feet"], correct: 0 },
        { q: "If your car stalls in floodwater, what should you do?", a: ["Stay in the car and call for help", "Abandon the car and move to higher ground", "Try to restart the engine", "Wait for the water to recede"], correct: 1 },
        { q: "What is a 'flash flood'?", a: ["A flood that happens at night", "A sudden, rapid flooding of low-lying areas", "A flood caused by a dam breaking", "A flood that is not dangerous"], correct: 1 },
        { q: "What is a major health risk from floodwater?", a: ["It is too cold", "It can be contaminated with sewage and chemicals", "It attracts sharks", "It is too salty"], correct: 1 },
        { q: "Should you use electrical appliances if you are standing in water?", a: ["Yes, if they are waterproof", "Only if you are wearing rubber boots", "No, there is a high risk of electrocution", "Yes, but be quick"], correct: 2 },
    ],
    wildfire: [
        { q: "What does 'defensible space' mean in wildfire safety?", a: ["A place to hide", "An area around a home cleared of flammable materials", "A type of fire shelter", "A firefighting term"], correct: 1 },
        { q: "If a wildfire is approaching, what is the best course of action?", a: ["Stay and defend your home", "Evacuate early following official orders", "Wait to see how close it gets", "Drive towards the fire to see it"], correct: 1 },
        { q: "What is a 'Red Flag Warning'?", a: ["A warning that a fire has started", "A warning of ideal conditions for a wildfire to start and spread", "A type of traffic signal", "A notice to stop burning leaves"], correct: 1 },
        { q: "Which of these is a good item for a wildfire evacuation kit?", a: ["A map with multiple escape routes", "Heavy winter coats", "A collection of comic books", "A single bottle of water"], correct: 0 },
    ],
    hurricane: [
        { q: "What is the center of a hurricane called?", a: ["The storm surge", "The eye wall", "The eye", "The rainband"], correct: 2 },
        { q: "What is the most dangerous element of a hurricane in coastal areas?", a: ["Wind", "Rain", "Storm surge", "Lightning"], correct: 2 },
        { q: "What does the Saffir-Simpson Scale measure?", a: ["Earthquake magnitude", "Tornado speed", "Hurricane intensity", "Flood water depth"], correct: 2 },
        { q: "Before a hurricane, what should you do with outdoor furniture?", a: ["Cover it with a tarp", "Bring it inside or secure it firmly", "Leave it as is", "Wash it thoroughly"], correct: 1 },
    ]
};

export const chapters = [
    {
        title: 'Chapter 1: Fire Safety Basics & Drills',
        content: [
            { type: 'heading', value: 'Understanding Fire' },
            { type: 'text', value: 'A fire is a chemical reaction that releases light and heat. Fires are classified into different types. A <strong>Class C</strong> fire, for example, involves energized electrical equipment. Common causes of fires in schools include overloaded electrical outlets and faulty wiring.' },
            { type: 'text', value: 'Fires in buildings can spread incredibly fast, producing toxic smoke that is often more dangerous than the flames themselves. Because smoke rises, the air is cleaner and cooler near the floor.' },
            { type: 'heading', value: 'Key Safety Protocols' },
            { type: 'text', value: 'If a fire alarm sounds, you must <strong>evacuate calmly and immediately</strong>. Regular fire drills, conducted according to school policy, help ensure everyone knows the evacuation routes and procedures.' },
            { type: 'text', value: 'If your clothes catch fire, remember to <strong>Stop, Drop, and Roll</strong>. This action smothers the flames.' },
            { type: 'text', value: 'If you are trapped in a room, do not panic. Seal the cracks around the door with cloth or tape to block smoke, and call 911 to report your exact location.' },
            { type: 'text', value: 'If you need to use a fire extinguisher, remember <strong>P.A.S.S.</strong>:' },
            { type: 'list', value: ['<strong>P</strong>ull the pin.', '<strong>A</strong>im the nozzle at the base of the fire.', '<strong>S</strong>queeze the handle.', '<strong>S</strong>weep from side to side.' ] },
             { type: 'image', value: 'assets/images/fire-ext.webp' },
            { type: 'heading', value: 'Do\'s and Don\'ts' },
             { type: 'image', value: 'assets/images/fire-D&D.jpg' },
            { type: 'list', value: [
                '<strong>Do:</strong> Stay low to the ground to avoid smoke.',
                '<strong>Do:</strong> Check doors for heat with the back of your hand before opening.',
                '<strong>Do:</strong> If a door is hot or you see smoke in a hallway, use a secondary exit or find an alternate route.',
                '<strong>Do:</strong> Use stairs, never elevators.',
                '<strong>Do:</strong> Go directly to your pre-arranged assembly point outside.',
                '<strong>Don\'t:</strong> Ever go back inside a burning building. The structure could collapse, or the fire could reignite suddenly.',
                '<strong>Don\'t:</strong> Stop to collect personal belongings.',
                '<strong>Don\'t:</strong> Hide. Always try to evacuate.'
            ]}
        ],
        gameType: 'fire',
        gameTitle: 'Take the Fire Safety Quiz',
        videoUrl: './assets/videos/chapter1-fire.mp4'
    },
    {
        title: 'Chapter 2: Earthquake Safety',
        content: [
            { type: 'heading', value: 'Understanding Earthquakes' },
            { type: 'text', value: 'An earthquake is the sudden, violent shaking of the ground caused by the movement of tectonic plates deep within the Earth. They strike without warning and can cause buildings to collapse, create landslides, and trigger tsunamis. The primary danger during an earthquake is from falling objects and collapsing structures.' },
            { type: 'text', value: 'After the main earthquake, smaller quakes called <strong>aftershocks</strong> can occur. These can be strong enough to cause additional damage, so it\'s important to remain cautious.' },
            { type: 'heading', value: 'The Primary Safety Protocol: Drop, Cover, and Hold On' },
            { type: 'text', value: 'This is the most important action to take the moment you feel shaking:' },
            { type: 'image', value: 'assets/images/quake-prot.jpg' },
            { type: 'list', value: ['<strong>Drop:</strong> Immediately drop to your hands and knees to prevent being knocked over.', '<strong>Cover:</strong> Cover your head and neck with your arms. If possible, crawl under a sturdy desk or table for additional protection.', '<strong>Hold On:</strong> Hold on to your shelter. If it moves, move with it. Wait until the shaking stops.' ] },
            { type: 'heading', value: 'Preparedness and Post-Quake Actions' },
            { type: 'text', value: 'After the shaking stops, the first thing you should do is check yourself and others for injuries. Having a well-stocked emergency kit is vital for the aftermath.' },
            { type: 'heading', value: 'Emergency Kit Essentials' },
            { type: 'list', value: ['Water (one gallon per person per day)', 'Non-perishable food for several days', 'Flashlight and extra batteries', 'First-aid kit', 'Whistle to signal for help', 'Dust masks to filter contaminated air', 'Any necessary personal medications' ] },
            { type: 'heading', value: 'Do\'s and Don\'ts' },
            { type: 'image', value: 'assets/images/quake-DD.png' },
            { type: 'list', value: [
                '<strong>Do:</strong> If you are outdoors, move to an open area away from buildings, trees, and power lines.',
                '<strong>Do:</strong> If you are in a car, pull over to a clear location and stay inside with your seatbelt on.',
                '<strong>Do:</strong> If you are in bed, stay there and cover your head with a pillow.',
                '<strong>Don\'t:</strong> Stand in a doorway. In modern homes, doorways are no stronger than any other part of the house and can cause injury from swinging.',
                '<strong>Don\'t:</strong> Run outside during the shaking; you are more likely to be injured by falling debris.',
                '<strong>Don\'t:</strong> Use elevators.',
                '<strong>Don\'t:</strong> Use matches or lighters after a quake, as there could be dangerous gas leaks.'
            ]}
        ],
        gameType: 'earthquake',
        gameTitle: 'Take the Earthquake Safety Quiz',
        videoUrl: './assets/videos/chapter2-earthquake.mp4'
    },
    {
        title: 'Chapter 3: Flood Preparedness',
        content: [
            { type: 'heading', value: 'Understanding Floods' },
            { type: 'text', value: 'Floods occur when an overflow of water submerges land that is usually dry. They can result from heavy rainfall, overflowing rivers, or coastal storm surges. A "flash flood" is a particularly dangerous type that occurs with little to no warning. Floodwater is dangerous not just because of its depth and current, but also because it can be contaminated with sewage, chemicals, and other hazardous materials, posing a major health risk.' },
            { type: 'image', value: 'assets/images/flood2.jpg' },
             { type: 'image', value: 'assets/images/flood22.webp' },
            { type: 'heading', value: 'Emergency Kit Essentials' },
            { type: 'image', value: 'assets/images/floodkit.webp' },
            { type: 'list', value: ['Water and non-perishable food', 'Flashlight and battery-powered radio', 'First-aid kit', 'Important documents sealed in a waterproof container' ] },
            { type: 'heading', value: 'Key Safety Protocols' },
            { type: 'text', value: 'The single most important rule is to never enter floodwater. Remember the slogan: <strong>"Turn Around, Don\'t Drown!"</strong>' },
            { type: 'list', value: ['Just 6 inches of moving water can knock you off your feet.', '1 foot of water can sweep a small car away.', '2 feet of water can carry away most vehicles, including SUVs and trucks.' ] },
            { type: 'heading', value: 'Do\'s and Don\'ts' },
            { type: 'image', value: 'assets/images/flood-dd.webp' },
            { type: 'image', value: 'assets/images/flood-dd2.jpg' },
            { type: 'list', value: [
                '<strong>Do:</strong> Move to higher ground immediately if you are in a flood-prone area.',
                '<strong>Do:</strong> Listen to emergency officials and evacuate if told to do so.',
                '<strong>Do:</strong> Be aware of hidden dangers under the water, like washed-out roads or debris.',
                '<strong>Do:</strong> If your car stalls in floodwater, abandon it and move to higher ground if you can do so safely.',
                '<strong>Don\'t:</strong> Walk, swim, or drive through floodwaters.',
                '<strong>Don\'t:</strong> Touch or use electrical equipment and appliances if you are wet or standing in water due to the high risk of electrocution.',
                '<strong>Don\'t:</strong> Camp or park your vehicle along streams or rivers, particularly during threatening conditions.'
            ]}
        ],
        gameType: 'flood',
        gameTitle: 'Take the Flood Safety Quiz',
        videoUrl: './assets/videos/chapter3-flood.mp4'
    },
    {
        title: 'Chapter 4: Tornado Safety',
        content: [
            { type: 'heading', value: 'Understanding Tornadoes and Alerts' },
            { type: 'text', value: 'A tornado is a violently rotating column of air extending from a thunderstorm to the ground. A <strong>funnel cloud</strong> is similar, but it has not made contact with the ground. Signs of a tornado include a dark, greenish sky and a loud roar like a freight train. "Tornado Alley" is a nickname for a region in the central United States where tornadoes are most frequent.' },
            { type: 'text', value: 'It is vital to know the difference between a <strong>"Tornado Watch"</strong> (conditions are favorable for a tornado to form) and a <strong>"Tornado Warning"</strong> (a tornado has been sighted or indicated by radar; take shelter immediately).' },
            { type: 'heading', value: 'Shelter-in-Place Protocol' },
            { type: 'image', value: 'assets/images/tornado-shel.png' },
            { type: 'text', value: 'The goal is to put as many walls as possible between you and the outside.' },
            { type: 'list', value: ['Go to a basement, storm cellar, or the lowest level of the building.', 'If there is no basement, go to an interior room, hallway, or closet with no windows.', 'Get under a sturdy piece of furniture, like a heavy table or desk.', 'Cover your head and neck with your arms.' ] },
            { type: 'heading', value: 'Shelter Emergency Kit' },
            { type: 'list', value: ['Keep an emergency kit in your designated shelter location.', 'Include water, food, a first-aid kit, a flashlight, and a radio.', 'Consider adding helmets for extra head protection.' ] },
            { type: 'heading', value: 'Do\'s and Don\'ts' },
             { type: 'image', value: 'assets/images/tornado-dd.webp' },
            { type: 'list', value: [
                '<strong>Do:</strong> Take a "Tornado Warning" seriously and seek shelter immediately.',
                '<strong>Do:</strong> If in a mobile home, evacuate immediately and go to a designated community shelter or sturdy building.',
                '<strong>Do:</strong> If caught outside with no shelter, lie flat in a nearby ditch or depression.',
                '<strong>Do:</strong> Be aware of hazards like downed power lines and broken glass after the tornado passes.',
                '<strong>Don\'t:</strong> Stay near windows or doors.',
                '<strong>Don\'t:</strong> Take shelter under a highway overpass, as it can act as a wind tunnel.',
                '<strong>Don\'t:</strong> Try to outrun a tornado in a car; they are unpredictable.'
            ]}
        ],
        gameType: 'tornado',
        gameTitle: 'Take the Tornado Safety Quiz',
        videoUrl: './assets/videos/chapter4-tornado.mp4'
    },
    {
        title: 'Chapter 5: Active Shooter Response',
        content: [
            { type: 'heading', value: 'Understanding the Protocol: Run, Hide, Fight' },
            { type: 'text', value: 'An active shooter event is a situation where one or more individuals are actively killing or attempting to kill people in a confined and populated area. The "Run, Hide, Fight" protocol provides a clear set of actions to increase the chances of survival. When law enforcement arrives, remain calm, follow all instructions, and keep your hands visible at all times.' },
            { type: 'image', value: 'assets/images/Response-prot.jpg' },
            { type: 'heading', value: '1. RUN (Evacuate)' },
            { type: 'list', value: ['If you see a clear escape path, use it immediately.', 'Leave your belongings behind.', 'Help others escape, if possible, but do not let them slow you down.', 'Keep your hands visible so law enforcement can see you are not a threat.' ] },
            { type: 'heading', value: '2. HIDE (Shelter in Place)' },
            { type: 'text', value: 'The main goal of hiding is to be completely out of the shooter\'s view and to prevent them from entering your space.' },
            { type: 'list', value: ['Find a room, preferably one that locks. Barricade the door with heavy furniture.', 'Silence your cell phone and any other sources of noise.', 'Hide behind large items and remain quiet. Pretending to be unconscious is not a reliable strategy.' ] },
            { type: 'heading', value: '3. FIGHT (Take Action)' },
            { type: 'list', value: ['As an absolute last resort, and only when your life is in imminent danger, attempt to disrupt or incapacitate the shooter.', 'Act with as much physical aggression as possible.', 'Improvise weapons with any available objects, such as chairs, books, or a fire extinguisher.', 'Commit to your actions. Your life depends on it.' ] }
        ],
        gameType: 'active-shooter',
        gameTitle: 'Take the Response Quiz',
        videoUrl: './assets/videos/chapter5-active-shooter.mp4'
    },
    {
        title: 'Chapter 6: Wildfire Safety',
        content: [
            { type: 'heading', value: 'Understanding Wildfires' },
            { type: 'text', value: 'Wildfires are uncontrolled fires that burn in wildland areas. They are often started by lightning or human carelessness. A <strong>"Red Flag Warning"</strong> is issued by meteorologists to alert fire managers of weather conditions that are ideal for wildfire ignition and rapid spread.' },
            { type: 'heading', value: 'Prevention and Preparedness' },
            { type: 'image', value: 'assets/images/wildfire.jpg' },
             { type: 'image', value: 'assets/images/wild-prep.jpeg' },
            { type: 'list', value: ['Create "defensible space" by clearing a 30-foot zone around your home of flammable materials like dead leaves and dry brush.', 'Use fire-resistant materials when building or renovating.', 'Know your community\'s evacuation routes and have a plan.' ] },
            { type: 'heading', value: 'Evacuation "Go Bag" Essentials' },
            { type: 'list', value: ['Water and non-perishable food', 'Medications and copies of important documents', 'A flashlight', 'N95 masks to protect against smoke inhalation.' ] },
            { type: 'heading', value: 'Do\'s and Don\'ts' },
             { type: 'image', value: 'assets/images/wild-dd.jpg' },
            { type: 'list', value: [
                '<strong>Do:</strong> Evacuate immediately when an evacuation order is issued.',
                '<strong>Do:</strong> Have an emergency "Go Bag" ready with essentials.',
                '<strong>Do:</strong> Stay informed through local news and emergency alerts.',
                '<strong>Don\'t:</strong> Wait to see the flames before you leave.',
                '<strong>Don\'t:</strong> Drive into or through a smoke-filled area.',
                '<strong>Don\'t:</strong> Assume you are safe. Embers can travel over a mile to start new fires.'
            ]}
        ],
        gameType: 'wildfire',
        gameTitle: 'Take the Wildfire Safety Quiz',
        videoUrl: './assets/videos/chapter6-wildfire.mp4'
    },
    {
        title: 'Chapter 7: Hurricane Preparedness',
        content: [
            { type: 'heading', value: 'Understanding Hurricanes' },
            { type: 'text', value: 'Hurricanes are massive, rotating storm systems that form over warm ocean waters. They bring destructive high winds, heavy rainfall, and a dangerous "storm surge"—a wall of ocean water pushed ashore by the wind, which is often the most dangerous element in coastal areas. The calm center of the storm is called the <strong>eye</strong>. The <strong>Saffir-Simpson Scale</strong> is a 1 to 5 rating based on a hurricane\'s sustained wind speed, used to measure its intensity.' },
            { type: 'heading', value: 'Preparedness Measures' },
             { type: 'image', value: 'assets/images/hurricane-prep.jpg' },
            { type: 'list', value: ['Know your evacuation zone and have a plan.', 'Board up windows with plywood.', 'Bring outdoor furniture inside or secure it firmly.', 'Keep your car\'s gas tank full.' ] },
            { type: 'heading', value: 'Disaster Kit Essentials' },
             { type: 'image', value: 'assets/images/hurricane-kit.png' },
            { type: 'list', value: ['Build a kit with at least a 3-day supply of water and non-perishable food.', 'Include a can opener, flashlight, battery-powered radio, and first-aid kit.', 'Pack any necessary medications and a whistle to signal for help.' ] },
            { type: 'heading', value: 'Do\'s and Don\'ts' },
             { type: 'image', value: 'assets/images/hurricane-dd.jpg' },
            { type: 'list', value: [
                '<strong>Do:</strong> Evacuate if you are in a designated evacuation zone or live in a mobile home.',
                '<strong>Do:</strong> Stay informed by listening to a battery-powered radio for updates.',
                '<strong>Do:</strong> Stay indoors and away from windows.',
                '<strong>Don\'t:</strong> Be fooled by the calm "eye" of the storm. The winds will return from the opposite direction.',
                '<strong>Don\'t:</strong> Use candles for light; use flashlights instead.',
                '<strong>Don\'t:</strong> Go outside until authorities declare it is safe.'
            ]}
        ],
        gameType: 'hurricane',
        gameTitle: 'Take the Hurricane Quiz',
        videoUrl: './assets/videos/chapter7-hurricane.mp4'
    },
];
