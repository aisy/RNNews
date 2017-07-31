
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

// source
import Source from './Source';
import NewsList from './NewsList';
import WebWatch from './WebWatch';

// import ScarletScreen from './ScarletScreen';

const App = () => {
    return (
        <Router>
            <Scene key="root">

                {/* Scene Source */}
                <Scene key="source"
                    component={ Source }
                    title="Source List"
                    initial
                />

                {/* Scene News */}
                <Scene
                    key="news"
                    component={ NewsList }
                    title="News List"
                />

                {/* Web View */}
                <Scene
                    key="webview"
                    component={ WebWatch }
                    title="Web View"
                />
                
            </Scene>
        </Router>
    );
}

export default App;