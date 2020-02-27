# T.E.D.D. The Efficient Delivery Driver

### Purpose

I delivered food at Wawa's first delivery test store. I noticed that we were not sending drivers out on deliveries in the most efficient way possible. Customer tips were visible to the drivers before hand, and deliveries were often delegated to provide an even amount of tips to drivers and not delegated with the customer's satisfaction in mind. We also did not know exactly how long each delivery was, we only saw a birdseye view of the map and we were to "eyeball" the most efficient routes. What delivery should we take out first? What drivers should be given what deliveries to ensure they are back in the store the fastest? These are the types of questions that I seek to answer with this project. 

### Description

The end goal of this project is to create a simulation that tests different strategies for delegating delivery drivers on their routes to see which strategy is the most efficient. 

For example, say we have only one driver available for a shift. Is it most efficient to send them out on deliveries as soon as possible? Or would it be better to have them wait 15 minutes after the first delivery to see if more will come in? If they wait they could save time by taking two orders out at once. 

The simulation will keep track of statictics like average delivery times, driver utilization, total distance traveled, etc.

### Progress

View the current progress at https://bioticcomponent.github.io/TEDD/src/

#### Current capabilities include:
* map generation using a recursive algorithm
    * the algorithm continuously splits the map into two randomly sized parts until a certain minimum road length is met
    * a new map is generated with the 'generate new map' button
* a central headquarters where drivers remain while not on a delivery
* add and remove drivers with their corresponding button
* no driver movement at the moment

#### Working on:
* random building generation
    * the buildings will not correspond to an "address" for deliveries, they are purely for visual purposes
* delivery event queue
    * an event queue will generate deliveries and assign them to a driver
* driver specific event queue
    * this queue will determine where a driver is going next
