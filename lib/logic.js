/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Diagnostic Transaction
 * @param {org.medical.DiagnosticTransaction} diagnosticTransaction
 * @transaction
 */
async function diagnosticTransaction(diagnosticTransaction) {

    let newDiagnostic = diagnosticTransaction.diagnostic
    let pacient = diagnosticTransaction.pacient

    if (pacient.diagnostics){
        pacient.diagnostics.push(newDiagnostic);
    }
    else
        pacient.diagnostics = [newDiagnostic];

    // Get the participant registry for the participant.
    const participantRegistry = await getParticipantRegistry('org.medical.Pacient');
    // Update the participant in the participant registry.
    await participantRegistry.update(pacient);

    // Emit an event for the modified asset.
    // let event = getFactory().newEvent('org.medical', 'SampleEvent');
    // event.asset = tx.asset;
    // event.oldValue = oldValue;
    // event.newValue = tx.newValue;
    // emit(event);
}
