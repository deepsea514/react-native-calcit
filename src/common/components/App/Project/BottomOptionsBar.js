import React from 'react';
import { View, Text, Animated } from 'react-native';

//custom components
import TitleIcon from './TitleIcon';

export default function BottomOptionsBar(props) {

    let { styles, isToolbarOpen, isItemsToolbarOpen, closeToolBar, openToolBar, closeItemsToolbar, openItemsToolbar, bottomBarTranslate } = props;

    return (
        <Animated.View style={[styles.bottomOptionsBar, {
            transform: [{ translateY: bottomBarTranslate }]
        }]}>
            <View style={styles.bottomOptionsLeft}>
                <View>
                    <TitleIcon
                        title="Draw"
                        onPress={() => { isToolbarOpen ? closeToolBar() : openToolBar() }}
                    />
                </View>
                <View style={styles.ml10}>
                    <TitleIcon
                        title="Notes"
                        icon="file-text-o"
                    />
                </View>
            </View>
            <View style={styles.bottomOptionsLeft}>
                <TitleIcon
                    title="Items"
                    icon="chevron-circle-up"
                    onPress={() => { isItemsToolbarOpen ? closeItemsToolbar() : openItemsToolbar() }}
                />
            </View>
        </Animated.View>
    )
}