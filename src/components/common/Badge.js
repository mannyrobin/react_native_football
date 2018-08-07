import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    badge: {
        fontSize: 30,
        padding: 5
    }
});

const Badge = ({ iconName, badgeCount, onPress }) =>
        <TouchableOpacity onPress={onPress}>
            <IconBadge 
                MainElement={
                <FontAwesomeIcon name={iconName} style={styles.badge} />
                } 
                BadgeElement={
                    <Text style={{ color: '#FFFFFF' }}>{badgeCount}</Text>
                }
                IconBadgeStyle={{
                        width: 10,
                        height: 10,
                        backgroundColor: '#5ecff4'
                    }}
                Hidden={badgeCount === 0}
            /> 
        </TouchableOpacity>;

export { Badge };
