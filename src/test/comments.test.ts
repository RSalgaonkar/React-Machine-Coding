import { describe, expect, it } from 'vitest';
import { commentsData } from '../data/commentsData';
import { addReplyToTree } from '../utils/comments';

describe('comment utilities', () => {
  it('adds reply to root comment', () => {
    const reply = {
      id: 'x1',
      author: 'You',
      text: 'Root reply',
      children: [],
    };

    const next = addReplyToTree(commentsData, '1', reply);

    expect(next[0].children.some((child) => child.id === 'x1')).toBe(true);
  });

  it('adds reply to nested comment', () => {
    const reply = {
      id: 'x2',
      author: 'You',
      text: 'Nested reply',
      children: [],
    };

    const next = addReplyToTree(commentsData, '1-1', reply);

    expect(next[0].children[0].children[0].id).toBe('x2');
  });
});