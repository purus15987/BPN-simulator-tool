# BPN Simulator Tool

The **Boolean Petri Nets (BPN) Simulator Tool** is a web-based application for modeling, simulating, and analyzing Boolean Petri Nets (BPNs), a specialized type of Petri Net where places hold binary (true/false) states. Developed as a Bachelor of Technology project at Jawaharlal Nehru University (JNU), New Delhi, this tool provides a user-friendly graphical interface to design Place/Transition Nets (PT-nets), simulate their behavior, and perform analyses like reachability and safeness. It is built using **ReactJS** for the frontend and integrates with a backend server for managing BPN components.

<img src='public/images/bpn presentation1.jpg'/>

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Authors](#authors)
- [Contact](#contact)

## Features
- **Graphical BPN Editor**: Create and edit BPN models with places (circles), transitions (rectangles), and arcs (directed edges) using an SVG-based interface built with ReactJS.
- **Simulation**: Simulate transition firing based on boolean logic, visualizing token movements.
- **Analysis Tools**:
  - **Reachability Table**: Lists all reachable markings from the initial state.
  - **Safeness Check**: Verifies if the net is 1-safe (no place has more than one token).
  - **Boundedness**: Analyzes the maximum number of tokens per place.
- **Interactive Workspace**: Supports mouse events for placing elements, drawing arcs, and running transitions.
- **Report Generation**: Outputs simulation and analysis results, including reachability graphs.
- **Logic Gate Modeling** (AND, OR, NOT, NAND, etc.)
- **Scalability**: Handles small-to-medium BPN models efficiently, with mitigation of the state explosion problem.
- **Applications**: Suitable for modeling digital circuits, communication protocols, manufacturing systems, robotics, and traffic systems.

## Technologies
- **Frontend**: ReactJS, SVG for graphical rendering
- **Backend**: RESTful API (assumed Node.js/Express, running at `http://localhost:8000`)
- **Development Environment**: VSCode
- **Dependencies**: Standard React libraries (e.g., `react`, `react-dom`, `react-router-dom`)

## Installation
To set up the BPN Simulator Tool locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/purus15987/BPN-simulator-tool.git
   cd BPN-simulator-tool
   ```

2. **Install Frontend Dependencies**:
   Ensure Node.js is installed, then run:
   ```bash
   npm install
   ```

3. **Set Up the Backend**:
   - The backend server (not included in this repository) must be running at `http://localhost:8000`.
   - Configure API endpoints for CRUD operations on places, transitions, and arcs.
   - Refer to the project documentation for backend setup instructions.

4. **Start the Development Server**:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.


## Usage
1. **Create a Workspace**:
   - Use the sidebar (`Sidebar.js`) to create a new workspace for your BPN model.
   - Name the workspace and save it.
    
<img src='public/images/bpn presentation2.jpg'/>

2. **Design a BPN Model**:
   - Add **places** (conditions) and **transitions** (events) using the sidebar options.
   - Draw **arcs** by clicking and dragging between places and transitions.
   - Assign tokens (true/false) to places to set the initial marking.

<img src='public/images/bpn presentation3.jpg'/>
<img src='public/images/bpn presentation6.jpg'/>

3. **Simulate the Model**:
   - Select a transition and click "Run Transition" to fire it, updating token distributions.
   - Observe the simulation in the graphical workspace.

<img src='public/images/bpn presentation5.jpg'/>

4. **Analyze the Model**:
   - Generate a **reachability table** to view all possible markings.
   - Check **safeness** to ensure the net is 1-safe.
   - Export analysis results for further study.
  
<img src='public/images/bpn presentation7.jpg'/>
<img src='public/images/bpn presentation8.jpg'/>
<img src='public/images/bpn presentation9.jpg'/>
<img src='public/images/bpn presentation10.jpg'/>

5. **Save and Export**:
   - Generate reports, including reachability graphs, via the menu bar.

## Authors
- **Rasamsetty Naga Venkata Sai**, Email: [rasams98_soe@jnu.ac.in](emailto:rasams98_soe@jnu.ac.in)
- **Mailapalli Purushotham**, Email: [purus15987@gmail.com](emailto:purus15987@gmail.com)
- **Terala Mani Kiran**, Email: [manikiran2202@gmail.com](emailto:manikiran2202@gmail.com)
- **Supervisor**: Lt. Dr. Gajendra Pratap Singh, Email: [gajendra@mail.jnu.ac.in](emailto:gajendra@mail.jnu.ac.in), Jawaharlal Nehru University (JNU), New Delhi

## Contact
For questions, suggestions, or issues, please contact the authors via JNU’s official channels or open an issue on this repository.

---
*Developed as part of a B.Tech project at JNU, February 2022.*
