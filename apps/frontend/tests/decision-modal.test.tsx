import React, { StrictMode } from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  areYouSure,
  DecisionEverywhere,
  ModalManager,
  useModals,
} from '../src/components/layout/new-modal';
import { deleteDialog } from '@gitroom/react/helpers/delete.dialog';

vi.mock('@gitroom/react/translation/i18next', async () => {
  const { default: translations } = await import(
    '../../../libraries/react-shared-libraries/src/translation/locales/pt/translation.json'
  );
  const labels = new Map(Object.entries(translations));
  return {
    default: {
      t: (key: string, fallback: string) => labels.get(key) ?? fallback,
    },
  };
});

vi.mock(
  '@gitroom/react/translation/get.transation.service.client',
  async () => {
    const { default: i18next } = await import(
      '@gitroom/react/translation/i18next'
    );
    return { useT: () => i18next.t };
  }
);

afterEach(() => {
  const { result, unmount } = renderHook(useModals);
  act(() => result.current.closeAll());
  unmount();
  cleanup();
});

const renderDialogs = () =>
  render(
    <StrictMode>
      <ModalManager>
        <DecisionEverywhere />
      </ModalManager>
    </StrictMode>
  );

describe('confirmation action hierarchy', () => {
  it.each([
    ['Não, cancelar', false],
    ['Sim, excluir', true],
  ])(
    'keeps cancel primary and resolves %s correctly for deletions',
    async (label, expected) => {
      renderDialogs();
      let result: Promise<boolean> | undefined;
      act(() => {
        result = deleteDialog('Excluir esta postagem?');
      });

      const cancel = screen.getByRole('button', { name: 'Não, cancelar' });
      const confirm = screen.getByRole('button', { name: 'Sim, excluir' });
      expect(cancel.classList.contains('bg-forth')).toBe(true);
      expect(confirm.classList.contains('bg-btnSimple')).toBe(true);
      expect(confirm.classList.contains('text-btnText')).toBe(true);
      fireEvent.click(screen.getByRole('button', { name: label }));
      await expect(result).resolves.toBe(expected);
      expect(screen.queryByText('Excluir esta postagem?')).toBeNull();
    }
  );

  it('keeps ordinary confirmation primary and cancel secondary', async () => {
    renderDialogs();
    let result: Promise<boolean> | undefined;
    act(() => {
      result = areYouSure({
        description: 'Continuar?',
        approveLabel: 'Continuar',
      });
    });
    expect(
      screen
        .getByRole('button', { name: 'Continuar' })
        .classList.contains('bg-forth')
    ).toBe(true);
    expect(
      screen
        .getByRole('button', { name: 'Não, cancelar' })
        .classList.contains('bg-btnSimple')
    ).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));
    await expect(result).resolves.toBe(true);
  });

  it('keeps a lone acknowledgement primary even for a destructive notice', async () => {
    renderDialogs();
    let result: Promise<boolean> | undefined;
    act(() => {
      result = areYouSure({
        description: 'Aviso',
        onlyApprove: true,
        destructive: true,
        approveLabel: 'OK',
      });
    });
    expect(screen.queryByRole('button', { name: 'Não, cancelar' })).toBeNull();
    expect(
      screen.getByRole('button', { name: 'OK' }).classList.contains('bg-forth')
    ).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    await expect(result).resolves.toBe(true);
  });

  it.each(['close', 'escape', 'backdrop'])(
    'resolves a dismissed dialog as false via %s',
    async (dismissal) => {
      const { container } = renderDialogs();
      let result: Promise<boolean> | undefined;
      act(() => {
        result = deleteDialog('Excluir esta postagem?');
      });
      if (dismissal === 'escape') {
        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
        fireEvent.keyUp(document, { key: 'Escape', code: 'Escape' });
      } else if (dismissal === 'close') {
        fireEvent.click(screen.getByRole('button', { name: '' }));
      } else {
        const backdrop = container.querySelector('.bg-popup');
        if (!backdrop) throw new Error('Missing modal backdrop');
        fireEvent.click(backdrop);
      }
      await expect(result).resolves.toBe(false);
      expect(screen.queryByText('Excluir esta postagem?')).toBeNull();
    }
  );
});
