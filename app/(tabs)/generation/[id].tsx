import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import React from 'react'
import { DATA } from '@/data/sampleDataFromUser'
import GenerationGraph from '@/components/generation/GenerationGraph'

const GenerationDetails = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <GenerationGraph rawData={DATA} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default GenerationDetails
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
})
