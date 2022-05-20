import TypeIt from "typeit-react";
import './welcome.css';

export const WelcomeBlock = () => {

    return (
        <div className='welcome-block'>
            <h4 className='welcome-block__header'>Admin GraphQL Cabinet</h4>
            <div className='welcome-block__typing'>
                <span className='welcome-block__typing_static'>Here you can:</span>
                <TypeIt
                    style={{color: ' #06d6a0', paddingLeft: '5px'}}
                    classname='welcome-block__typing_dynamic'
                    options={{
                        speed: 100,
                        waitUntilVisible: true,
                        loop: true,
                    }}
                    getBeforeInit={(instance) => {
                        instance
                            .type(" check all users")
                            .pause(750)
                            .delete(15)
                            .pause(500)
                            .type("edit someone?")
                            .pause(750)
                            .delete(20)
                            .pause(500)
                            .type("add new users")
                            .pause(750)
                            .delete(16)
                            .pause(500)
                            .type("or delete them");
                        return instance;
                    }}
                />
            </div>
        </div>
    )
}