import { MessageConnection, createMessageConnection, Logger } from 'vscode-jsonrpc';
import { Channel } from './channel';
import { ChannelMessageReader } from './reader';
import { ChannelMessageWriter } from './writer';
import { injectable } from 'inversify';

export const ConnnectionFactory = Symbol('ConnnectionFactory');

export interface ConnnectionFactory<T> {
    create(t: T, logger: Logger): MessageConnection;
}

@injectable()
export class ConnnectionFactoryImpl implements ConnnectionFactory<Channel> {
    create(channel: Channel, logger: Logger): MessageConnection {
        const messageReader = new ChannelMessageReader(channel);
        const messageWriter = new ChannelMessageWriter(channel);
        const connection = createMessageConnection(messageReader, messageWriter, logger);
        connection.onClose(() => connection.dispose());
        return connection;
    }
}
