import React from 'react';
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize';

const Home = () => {
    return (
        <Collapsible accordion={false}>
            <CollapsibleItem
                expanded={false}
                header="Welcome to the react view of this project!"
                icon={<Icon>report_problem</Icon>}
                node="div"
            >
                It was made using materializecss as layout.
  </CollapsibleItem>
            <CollapsibleItem
                expanded={false}
                header="You can access any table but authentication is required for the actions!"
                icon={<Icon>account_circle</Icon>}
                node="div"
            >
                If you know me, you probably know the password tho. <Icon>mood</Icon>
  </CollapsibleItem>
            <CollapsibleItem
                expanded={false}
                header="You can access the blade view of this project"
                icon={<Icon>remove_red_eye</Icon>}
                node="div"
            >
                By clicking in <a href="/blade/home">Here</a>.
  </CollapsibleItem>
            <CollapsibleItem
                expanded={false}
                header="You can access the code of this project on my github"
                icon={<Icon>sentiment_very_satisfied</Icon>}
                node="div"
            >
                By clicking in <a href="https://github.com/fabiobap/hybrid-project">Here</a>.
  </CollapsibleItem>
        </Collapsible>
    );
}
export default Home;
